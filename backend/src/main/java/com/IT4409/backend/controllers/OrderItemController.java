package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.OrderItemDTO.OrderItemResponseDTO;
import com.IT4409.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/orders")
public class OrderItemController {
    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("{orderId}/items/{orderItemId}")
    public ResponseEntity<?> getOrderItemForUser(@RequestHeader("Authorization") String jwt,
                                                 @PathVariable("orderId") Long orderId,
                                                 @PathVariable("orderItemId") Long orderItemId) {
        try {
            OrderItemResponseDTO orderItem = orderItemService.getOrderItemForUser(jwt, orderId, orderItemId);
            return new ResponseEntity<>(orderItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
