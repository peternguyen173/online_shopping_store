package com.IT4409.backend.controllers;

import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/api/admin/users")
    public ResponseEntity<?> getAllUsers(){
        try{
            List<User> user=userService.findAllUsers();
            return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/api/admin/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        try{
            User user = userService.deleteUser(userId);
            return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("users/1")
    public ResponseEntity<?> getAdmin(){
        try{
            User user = userRepository.findById((long) 1)
                    .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
            return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/api/users/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String jwt){
        try {
            User user = userService.findUserByJwt(jwt);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("api/users/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String jwt, String newPassword) {
        try{
            User user = userService.changePassword(jwt, newPassword);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
