package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.dtos.CartItemDTO.CartItemResponseDTO;
import com.IT4409.backend.services.CartItemService;
import com.IT4409.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/cart/cart-items")
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private CartService cartService;
    @GetMapping("/{cartItemId}")
    public ResponseEntity<?> getCartItemById(@PathVariable("cartItemId") Long cartItemId,
                                             @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            CartItemResponseDTO cartItem = cartItemService.getCartItemById(jwt, cartItemId);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addCartItem(@RequestBody CartItemRequestDTO cartItemRequestDTO,
                                         @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            CartItemResponseDTO cartItem = cartItemService.addCartItem(jwt, cartItemRequestDTO);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{cartItemId}")
    public ResponseEntity<?> updateCartItem(@PathVariable("cartItemId") Long cartItemId,
                                            @RequestBody CartItemRequestDTO cartItemRequestDTO,
                                            @RequestHeader("Authorization") String jwt) throws Exception {
        try{
            CartItemResponseDTO cartItem = cartItemService.updateCartItem(jwt, cartItemId, cartItemRequestDTO);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable("cartItemId") Long cartItemId,
                                            @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            CartItemResponseDTO cartItem = cartItemService.removeCartItem(jwt, cartItemId);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
