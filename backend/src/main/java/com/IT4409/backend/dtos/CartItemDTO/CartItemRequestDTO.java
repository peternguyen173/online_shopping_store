package com.IT4409.backend.dtos.CartItemDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequestDTO {
    private Long productId;
    private String color;
    private String size;
    private Integer quantity;
}
