package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.CartDTO.CartResponseDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.services.CartService;
import com.IT4409.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.IT4409.backend.Utils.Constants.messages;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartRepository cartRepository;
    @GetMapping("")
    public ResponseEntity<?> findCartByUser(@RequestHeader("Authorization") String jwt) throws Exception {
        try{
            User user = userService.findUserByJwt(jwt);
            CartResponseDTO cart = cartService.findCartByUserId(user.getUserId());
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/discounts")
    public ResponseEntity<?> findCartVoucher(@RequestHeader("Authorization") String jwt) throws Exception {
        try{
            User user = userService.findUserByJwt(jwt);
            CartResponseDTO cart = cartService.findCartByUserId(user.getUserId());
            Cart cart1 = cartRepository.findById(cart.getCartId()).get();
            if(cart1.getDiscountCode() != null) {
                return new ResponseEntity<>(cart1.getDiscountCode(), HttpStatus.OK);
            }
            else throw new NotFoundException(messages.getString("discount.validate.not-found"));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
