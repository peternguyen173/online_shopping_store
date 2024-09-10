package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.UserDetailDTO.UserDetailRequestDTO;
import com.IT4409.backend.entities.UserDetail;

import java.util.List;

public interface IUserDetailService {
    List<UserDetail> getAllUserDetails(String jwt) throws Exception;

    UserDetail getUserDetailById(String jwt, Long userDetailId) throws Exception;

    UserDetail createUserDetail(String jwt, UserDetailRequestDTO userDetailRequestDTO) throws Exception;

    UserDetail updateUserDetail(String jwt, Long userDetailId, UserDetailRequestDTO userDetailRequestDTO) throws Exception;

    UserDetail deleteUserDetail(String jwt, Long userDetailId) throws Exception;
}
