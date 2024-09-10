package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.OrderItemDTO.OrderItemResponseDTO;
import com.IT4409.backend.entities.OrderItem;

public interface IOrderItemService {
    OrderItem getOrderItem(Long orderId, Long orderItemId);

    OrderItem updateOrderItem(Long orderId, Long orderItemId);

    OrderItem deleteOrderItem(Long orderId, Long orderItemId);

    OrderItemResponseDTO getOrderItemForUser(String jwt, Long orderId, Long orderItemId) throws Exception;
}
