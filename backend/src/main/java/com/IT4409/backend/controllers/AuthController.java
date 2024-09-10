package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.AuthDTO.AuthRequestDTO;
import com.IT4409.backend.dtos.AuthDTO.AuthResponseDTO;
import com.IT4409.backend.dtos.UserDTO.UserRequestDTO;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.security.JwtTokenProvider;
import com.IT4409.backend.services.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequestDTO user) throws Exception {
        AuthResponseDTO authResponseDTO= userService.createUser(user);
        return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody AuthRequestDTO authRequestDTO) throws Exception{
        try {
            AuthResponseDTO authResponseDTO= userService.signIn(authRequestDTO);
            System.out.println(SecurityContextHolder.getContext());
            return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        try{
            userService.logout();
            return ResponseEntity.ok().body("Đăng xuất thành công");
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/verify-email/{token}")
    public ModelAndView confirmEmail(@PathVariable("token") String token) {
        try{
            String result = userService.confirmEmail(token);
            return new ModelAndView("confirm-success");
        } catch (Exception e) {
            return new ModelAndView("confirm-fail");
        }
    }
}
