package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.DiscountDTO.DiscountRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
public class DiscountController {
    @Autowired
    private DiscountService discountService;

    @GetMapping("/api/admin/discounts")
    public ResponseEntity<?> getAllDiscount() {
        try {
            List<Discount> discountList = discountService.getAllDiscount();
            return new ResponseEntity<>(discountList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/admin/discounts/{discountId}")
    public ResponseEntity<?> getDiscountById(@PathVariable("discountId") Long discountId) {
        try {
            Discount discount = discountService.getById(discountId);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/cart/discounts")
    public ResponseEntity<?> applyDiscountToCart(@RequestHeader("Authorization") String jwt,
                                                 @RequestBody String discountCode) {
        try{
            Cart cart = discountService.applyDiscount(jwt, discountCode);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/api/cart/discounts")
    public ResponseEntity<?> deleteDiscountFromCart(@RequestHeader("Authorization") String jwt) {
        try{
            Cart cart = discountService.deleteDiscountFromCart(jwt);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/admin/discounts")
    public ResponseEntity<?> addDiscount(@RequestBody DiscountRequestDTO discountRequestDTO) {
        try {
            Discount discount = discountService.addDiscount(discountRequestDTO);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/api/admin/discounts/{discountId}")
    public ResponseEntity<?> updateDiscount(@PathVariable("discountId") Long discountId,
                                            @RequestBody DiscountRequestDTO discountRequestDTO) {
        try {
            Discount discount = discountService.updateDiscount(discountId, discountRequestDTO);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/admin/discounts/{discountId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable("discountId") Long discountId) {
        try {
            Discount discount = discountService.deleteDiscount(discountId);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
