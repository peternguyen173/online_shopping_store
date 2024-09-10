package com.IT4409.backend.dtos.CartItemDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponseDTO {
    private Long cartItemId;
    private Long cartId;
    private String productName;
    private Long productPrice;
    private Integer quantity;
    private String color;
    private String size;
    private Long price;
    private Long discountPrice;
    private LocalDateTime createAt;
    private String thumbnail;
}
