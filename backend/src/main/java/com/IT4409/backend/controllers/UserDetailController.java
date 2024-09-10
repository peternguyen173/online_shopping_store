package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.UserDetailDTO.UserDetailRequestDTO;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.services.CustomerDetailService;
import com.IT4409.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/account/user-details")
@Validated
public class UserDetailController {
    @Autowired
    private CustomerDetailService customerDetailService;
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<?> getAllUserDetails(@RequestHeader("Authorization") String jwt) {
        try {
            List<UserDetail> userDetailList = customerDetailService.getAllUserDetails(jwt);
            return new ResponseEntity<>(userDetailList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userDetailId}")
    public ResponseEntity<?> getUserDetailById(@RequestHeader("Authorization") String jwt,
                                               @PathVariable("userDetailId") Long userDetailId) {
        try {
            UserDetail userDetail = customerDetailService.getUserDetailById(jwt, userDetailId);
            return new ResponseEntity<>(userDetail, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("")
    public ResponseEntity<?> createUserDetail(@RequestHeader("Authorization") String jwt,
                                              @RequestBody @Valid UserDetailRequestDTO userDetailRequestDTO) {
        try {
            UserDetail userDetail = customerDetailService.createUserDetail(jwt, userDetailRequestDTO);
            return new ResponseEntity<>(userDetail, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{userDetailId}")
    public ResponseEntity<?> updateUserDetail(@RequestHeader("Authorization") String jwt,
                                              @PathVariable("userDetailId") Long userDetailId,
                                              @RequestBody @Valid UserDetailRequestDTO userDetailRequestDTO) {
        try {
            UserDetail userDetail = customerDetailService.updateUserDetail(jwt, userDetailId, userDetailRequestDTO);
            return new ResponseEntity<>(userDetail, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{userDetailId}")
    public ResponseEntity<?> deleteUserDetail(@RequestHeader("Authorization") String jwt,
                                              @PathVariable("userDetailId") Long userDetailId) {
        try {
            UserDetail userDetail = customerDetailService.deleteUserDetail(jwt, userDetailId);
            return new ResponseEntity<>(userDetail, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
