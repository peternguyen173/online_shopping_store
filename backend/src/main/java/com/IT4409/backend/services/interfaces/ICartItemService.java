package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.dtos.CartItemDTO.CartItemResponseDTO;

public interface ICartItemService {
    CartItemResponseDTO addCartItem(String jwt, CartItemRequestDTO cartItemRequestDTO) throws Exception;

    CartItemResponseDTO updateCartItem(String jwt, Long cartItemId, CartItemRequestDTO cartItemRequestDTO) throws Exception;

    CartItemResponseDTO removeCartItem(String jwt, Long cartItemId) throws Exception;

    CartItemResponseDTO getCartItemById(String jwt, Long cartItemId) throws Exception;
}
