package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.AuthDTO.AuthRequestDTO;
import com.IT4409.backend.dtos.AuthDTO.AuthResponseDTO;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.BadRequestException;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.List;

public interface IUserService {
    User findUserByJwt(String jwt) throws Exception;
    List<User> findAllUsers();
    AuthResponseDTO signIn(AuthRequestDTO authRequestDTO) throws BadCredentialsException;
    AuthResponseDTO createUser(User user) throws BadRequestException;
}
