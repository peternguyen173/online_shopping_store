package com.IT4409.backend.dtos.OrderDTO;

import com.IT4409.backend.dtos.OrderItemDTO.OrderItemResponseDTO;
import com.IT4409.backend.dtos.UserDetailDTO.UserDetailResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private Long userId;
    private String orderStatus;
    private String paymentStatus;
    private String paymentMethod;
    private LocalDateTime createdAt;
    private Long totalAmount;
    private Long discountedAmount;
    private Long discountFromVoucher;
    private Long finalPrice;
    private String qrLink;
    private List<OrderItemResponseDTO> orderItemList;
    private UserDetailResponseDTO userDetail;
}
