package com.IT4409.backend.dtos.OrderDTO;

import com.IT4409.backend.dtos.UserDetailDTO.UserDetailRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDTO {
    private Long userDetailId;
    private UserDetailRequestDTO userDetailRequestDTO;
    private String paymentMethod;
}
