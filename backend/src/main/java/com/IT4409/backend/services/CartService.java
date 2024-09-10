package com.IT4409.backend.services;

import com.IT4409.backend.dtos.CartDTO.CartResponseDTO;
import com.IT4409.backend.dtos.CartItemDTO.CartItemResponseDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.services.interfaces.ICartService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

import static com.IT4409.backend.Utils.Constants.messages;

public class CartService implements ICartService {
    @Autowired
    private CartRepository cartRepository;
    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public CartResponseDTO findCartByUserId(long userId) throws NotFoundException {
        Cart cart = cartRepository.findByUserUserId(userId)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        long totalPrice = 0;
        long totalDiscountPrice = 0;
        int totalItem = 0;
        for(CartItem cartItem : cart.getCartItemList()) {
            totalPrice += cartItem.getPrice();
            if(cartItem.getDiscountPrice() != null) {
                totalDiscountPrice += cartItem.getDiscountPrice();
            } else {
                totalPrice += cartItem.getPrice();
            }
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalDiscountPrice(totalDiscountPrice);
        cart.setDiscountedAmount(totalPrice - totalDiscountPrice);

        return convertToCartResponseDTO(cartRepository.save(cart));
    }

    public CartResponseDTO convertToCartResponseDTO(Cart cart) {
        // Chuyển đổi danh sách CartItem sang CartItemResponseDTO
        List<CartItemResponseDTO> cartItemResponseDTOList = cart.getCartItemList().stream()
                .map(cartItem -> new CartItemResponseDTO(
                        cartItem.getCartItemId(),
                        cartItem.getCart().getCartId(),
                        cartItem.getProduct().getProductName(),
                        cartItem.getProduct().getDiscountPrice(),
                        cartItem.getQuantity(),
                        cartItem.getColor(),
                        cartItem.getSize(),
                        cartItem.getPrice(),
                        cartItem.getDiscountPrice(),
                        cartItem.getCreateAt(),
                        cartItem.getProduct().getThumbnail()
                ))
                .collect(Collectors.toList());

        return new CartResponseDTO(
                cart.getCartId(),
                cart.getUser().getUserId(),
                cartItemResponseDTOList,
                cart.getTotalPrice(),
                cart.getTotalItem(),
                cart.getDiscountCode(),
                cart.getTotalDiscountPrice(),
                cart.getDiscountedAmount()
        );
    }
}
