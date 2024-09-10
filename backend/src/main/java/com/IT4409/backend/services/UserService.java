package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.Utils.Role;
import com.IT4409.backend.dtos.AuthDTO.AuthRequestDTO;
import com.IT4409.backend.dtos.AuthDTO.AuthResponseDTO;
import com.IT4409.backend.dtos.UserDTO.UserRequestDTO;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.security.JwtTokenProvider;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.IT4409.backend.Utils.Constants.messages;
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private CartService cartService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private BlacklistService blacklistService;
//    @Override
    public List<User> findAllUsers() {
        return userRepository.findAllByOrderByCreatedAtDesc();
    }
//    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = jwtTokenProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        return user;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(messages.getString("user.validate.not-found")));
        return org.springframework.security.core.userdetails.User
                .withUsername(username)
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
    public AuthResponseDTO createUser(UserRequestDTO user) throws BadRequestException, MessagingException {
        String email = user.getEmail();
        String password = user.getPassword();
        String role = Role.CUSTOMER.toString();
        String verificationToken = UUID.randomUUID().toString();
        if(userRepository.existsByEmail(email)) {
            throw new BadRequestException(messages.getString("email.validate.duplicate"));
        }
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setRole(role);
        newUser.setVerificationToken(verificationToken);
        newUser.setStatus(Constants.ENTITY_STATUS.INACTIVE);
        newUser = userRepository.save(newUser);
        // Tạo user detail mới
        UserDetail userDetail = UserDetail
                .builder()
                .name(user.getName())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .build();
        userDetail.setUser(newUser);
        newUser.setUserDetailList(new ArrayList<>());
        newUser.getUserDetailList().add(userDetail);
        newUser = userRepository.save(newUser);
        // Tạo ra giỏ hàng mới cho khách hàng mới
        cartService.createCart(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        Context context = new Context();
        String url = Constants.LOCAL_HOST + "/auth/verify-email/" + verificationToken;
        context.setVariable("url", url);
        emailService.sendEmailWithHtmlTemplate(email, messages.getString("email.verify"), "email-verification", context);
        return new AuthResponseDTO(null, true);
    }
    public AuthResponseDTO signIn(AuthRequestDTO authRequestDTO) throws BadCredentialsException, BadRequestException {
        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        String username = authRequestDTO.getEmail();
        String password = authRequestDTO.getPassword();
        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.generateToken(authentication);
        authResponseDTO.setStatus(true);
        authResponseDTO.setJwt(accessToken);
        return authResponseDTO;
    }
    private Authentication authenticate(String username, String password) throws BadRequestException {
        UserDetails userDetails = loadUserByUsername(username);
        System.out.println(userDetails);
        if(userDetails == null) {
            throw new BadCredentialsException(messages.getString("username.validate.invalid"));
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException(messages.getString("password.validate.invalid"));
        }
        User user = userRepository.findByEmail(username).get();
        if(user.getStatus() != 1) {
            throw new BadRequestException(messages.getString("account.validate.not-verified"));
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public void logout() {
        String jwt = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        blacklistService.addToBlacklist(jwt);
        SecurityContextHolder.clearContext();
        System.out.println(SecurityContextHolder.getContext());
    }

    public User changePassword(String jwt, String newPassword) throws Exception {
        User user = findUserByJwt(jwt);
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    public String confirmEmail(String token) throws Exception {
        User user = userRepository.findByVerificationToken(token)
                        .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        if(!token.equals(user.getVerificationToken())){
            userRepository.delete(user);
            throw new BadRequestException(messages.getString("user.validate.token-invalid"));
        }
        user.setStatus(Constants.ENTITY_STATUS.ACTIVE);
        userRepository.save(user);
        return messages.getString("email.verify.success");
    }

    public User deleteUser(Long userId) throws NotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        userRepository.deleteById(userId);
        return user;
    }
}
