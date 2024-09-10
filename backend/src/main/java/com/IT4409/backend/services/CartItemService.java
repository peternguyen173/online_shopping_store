package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.dtos.CartItemDTO.CartItemResponseDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartItemRepository;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.services.interfaces.ICartItemService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Objects;

import static com.IT4409.backend.Utils.Constants.messages;

public class CartItemService implements ICartItemService {
    @Autowired
    private UserService userService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Override
    public CartItemResponseDTO getCartItemById(String jwt, Long cartItemId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        CartItem cartItem = cart.getCartItemList().stream()
                .filter(item -> Objects.equals(item.getCartItemId(), cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("cart-item.validate.not-found")));
        return convertToCartItemResponseDTO(cartItem);
    }
    @Override
    public CartItemResponseDTO addCartItem(String jwt, CartItemRequestDTO cartItemRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        Product product = productRepository.findById(cartItemRequestDTO.getProductId())
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        if(product.getStatus() == Constants.PRODUCT_STATUS.OUT_OF_STOCK) {
            throw new BadRequestException(messages.getString("product.validate.out-of-stock"));
        }
        if(cartItemRequestDTO.getQuantity() > product.getQuantityInStock()) {
            throw new BadRequestException(messages.getString("product.validate.insufficient"));
        }
        cartItemRequestDTO.setQuantity((cartItemRequestDTO.getQuantity() != null) ? cartItemRequestDTO.getQuantity() : 1);
        for (CartItem cartItem : cart.getCartItemList()) {
            if (cartItem.getProduct().getProductId().equals(cartItemRequestDTO.getProductId())
                    && cartItem.getColor().equals(cartItemRequestDTO.getColor())
                    && cartItem.getSize().equals(cartItemRequestDTO.getSize())) {
                int newQuantity = cartItem.getQuantity() + cartItemRequestDTO.getQuantity();
                cartItem.setQuantity(newQuantity);
                cartItem.setPrice(product.getPrice() * newQuantity);
                cartItem.setDiscountPrice(product.getDiscountPrice() * newQuantity);
                cartItem.setCreateAt(LocalDateTime.now());

                cartRepository.save(cart);
                return convertToCartItemResponseDTO(cartItem);
            }
        }

        CartItem newCartItem = CartItem
                .builder()
                .product(product)
                .color(cartItemRequestDTO.getColor())
                .size(cartItemRequestDTO.getSize())
                .quantity(cartItemRequestDTO.getQuantity())
                .price(product.getPrice() * cartItemRequestDTO.getQuantity())
                .discountPrice(product.getDiscountPrice() * cartItemRequestDTO.getQuantity())
                .createAt(LocalDateTime.now())
                .cart(cart)
                .build();
        cart.getCartItemList().add(newCartItem);
        cartRepository.save(cart);
        return convertToCartItemResponseDTO(newCartItem);
    }

    @Override
    public CartItemResponseDTO updateCartItem(String jwt, Long cartItemId, CartItemRequestDTO cartItemRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        CartItem cartItem = cart.getCartItemList().stream()
                .filter(item -> Objects.equals(item.getCartItemId(), cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("cart-item.validate.not-found")));
        Product product = cartItem.getProduct();
        cartItem.setSize(cartItemRequestDTO.getSize());
        cartItem.setColor(cartItemRequestDTO.getColor());

        if(cartItemRequestDTO.getQuantity() > product.getQuantityInStock()) {
            throw new BadRequestException(messages.getString("product.validate.insufficient"));
        }
        cartItem.setQuantity(cartItemRequestDTO.getQuantity());

        for (CartItem cartItem1 : cart.getCartItemList()) {
            if ( cartItem1.getColor().equals(cartItemRequestDTO.getColor())
                    && cartItem1.getSize().equals(cartItemRequestDTO.getSize())
                    && !Objects.equals(cartItem1.getCartItemId(), cartItemId)
            ) {
                int newQuantity = cartItem1.getQuantity() + cartItemRequestDTO.getQuantity();
                cartItem1.setQuantity(newQuantity);

                if ( newQuantity > product.getQuantityInStock()) {
                    throw new BadRequestException(messages.getString("product.validate.insufficient"));
                }

                cartItem1.setPrice(product.getPrice() * newQuantity);
                cartItem1.setDiscountPrice(product.getDiscountPrice() * newQuantity);
                cartItem1.setCreateAt(LocalDateTime.now());

                cart.getCartItemList().remove(cartItem);
                cartItemRepository.delete(cartItem);
                cartRepository.save(cart);
                return convertToCartItemResponseDTO(cartItem);
            }
        }

        cartItem.setDiscountPrice(product.getDiscountPrice() * cartItemRequestDTO.getQuantity());
        cartItem.setPrice(product.getPrice() * cartItemRequestDTO.getQuantity());
        return convertToCartItemResponseDTO(cartItemRepository.save(cartItem));
    }

    @Override
    public CartItemResponseDTO removeCartItem(String jwt, Long cartItemId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        CartItem cartItem = cart.getCartItemList().stream()
                .filter(item -> Objects.equals(item.getCartItemId(), cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("cart-item.validate.not-found")));
        Product product = cartItem.getProduct();
        cart.getCartItemList().remove(cartItem);
        cartRepository.save(cart);
        return convertToCartItemResponseDTO(cartItem);
    }

    private CartItemResponseDTO convertToCartItemResponseDTO(CartItem cartItem) {
        return new CartItemResponseDTO(
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
        );
    }
}
