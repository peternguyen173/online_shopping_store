package com.IT4409.backend.dtos.UserDetailDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailResponseDTO {
    private Long userDetailId;
    private String name;
    private String address;
    private String phoneNumber;
}
