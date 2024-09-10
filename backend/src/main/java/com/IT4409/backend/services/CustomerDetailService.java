package com.IT4409.backend.services;

import com.IT4409.backend.dtos.UserDetailDTO.UserDetailRequestDTO;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CustomerDetailRepository;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.services.interfaces.IUserDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Objects;

import static com.IT4409.backend.Utils.Constants.messages;

public class CustomerDetailService implements IUserDetailService {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerDetailRepository customerDetailRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<UserDetail> getAllUserDetails(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<UserDetail> userDetailList = user.getUserDetailList();
        if(userDetailList.isEmpty()){
            throw new NotFoundException(messages.getString("user-detail.validate.not-found"));
        }
        return userDetailList;
    }

    @Override
    public UserDetail getUserDetailById(String jwt, Long userDetailId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<UserDetail> userDetailList = user.getUserDetailList();
        return userDetailList.stream()
                .filter(userDetail -> Objects.equals(userDetail.getUserDetailId(), userDetailId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("user-detail.validate.not-found")));
    }

    @Override
    public UserDetail createUserDetail(String jwt, UserDetailRequestDTO userDetailRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        UserDetail userDetail = modelMapper.map(userDetailRequestDTO, UserDetail.class);
//        userDetail.setUser(user);
        user.setUserDetailList(List.of(userDetail));
        userRepository.save(user);
        return customerDetailRepository.save(userDetail);
    }

    @Override
    public UserDetail updateUserDetail(String jwt, Long userDetailId, UserDetailRequestDTO userDetailRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<UserDetail> userDetailList = user.getUserDetailList();
        UserDetail updatedUserDetail = userDetailList.stream()
                .filter(userDetail -> Objects.equals(userDetail.getUserDetailId(), userDetailId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("user-detail.validate.not-found")));
        updatedUserDetail.setAddress(userDetailRequestDTO.getAddress());
        updatedUserDetail.setPhoneNumber(updatedUserDetail.getPhoneNumber());
        updatedUserDetail.setName(updatedUserDetail.getName());
        return customerDetailRepository.save(updatedUserDetail);
    }

    @Override
    public UserDetail deleteUserDetail(String jwt, Long userDetailId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<UserDetail> userDetailList = user.getUserDetailList();
        UserDetail deletedUserDetail = userDetailList.stream()
                .filter(userDetail -> Objects.equals(userDetail.getUserDetailId(), userDetailId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("user-detail.validate.not-found")));
//        customerDetailRepository.deleteById(userDetailId);
        user.getUserDetailList().remove(deletedUserDetail);
        userRepository.save(user);
        return deletedUserDetail;
    }
}
