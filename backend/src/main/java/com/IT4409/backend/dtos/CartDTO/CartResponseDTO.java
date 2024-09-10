package com.IT4409.backend.dtos.CartDTO;

import com.IT4409.backend.dtos.CartItemDTO.CartItemResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {
    private Long cartId;
    private Long userId;
    private List<CartItemResponseDTO> cartItemList;
    private Long totalPrice;
    private Integer totalItem;
    private String discountCode;
    private Long totalDiscountPrice;
    private Long discountedAmount;
}
