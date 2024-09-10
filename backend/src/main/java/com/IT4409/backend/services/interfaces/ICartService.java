package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.CartDTO.CartResponseDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;

public interface ICartService {
    Cart createCart(User user);
    CartResponseDTO findCartByUserId(long userId) throws NotFoundException;
}
