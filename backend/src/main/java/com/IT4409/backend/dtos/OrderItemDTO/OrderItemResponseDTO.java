package com.IT4409.backend.dtos.OrderItemDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponseDTO {
    private Long orderItemId;
    private Long orderId;
    private Long productId;
    private String productName;
    private int quantity;
    private String size;
    private String color;
    private Long price;
    private String thumbnail;
}
