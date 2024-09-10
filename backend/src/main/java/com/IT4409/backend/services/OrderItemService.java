package com.IT4409.backend.services;

import com.IT4409.backend.dtos.OrderItemDTO.OrderItemResponseDTO;
import com.IT4409.backend.entities.Order;
import com.IT4409.backend.entities.OrderItem;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.services.interfaces.IOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;

import static com.IT4409.backend.Utils.Constants.messages;

public class OrderItemService implements IOrderItemService {
    @Autowired
    private UserService userService;
    @Override
    public OrderItem getOrderItem(Long orderId, Long orderItemId) {
        return null;
    }

    @Override
    public OrderItem updateOrderItem(Long orderId, Long orderItemId) {
        return null;
    }

    @Override
    public OrderItem deleteOrderItem(Long orderId, Long orderItemId) {
        return null;
    }

    @Override
    public OrderItemResponseDTO getOrderItemForUser(String jwt, Long orderId, Long orderItemId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Order order = user.getOrderList()
                .stream()
                .filter(order1 -> order1.getOrderId() == orderId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        OrderItem orderItem = order.getOrderItemList()
                .stream()
                .filter(orderItem1 -> orderItem1.getOrderItemId() == orderItemId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order-item.validate.not-found")));
        return new OrderItemResponseDTO(
                orderItem.getOrderItemId(),
                orderItem.getOrder().getOrderId(),
                orderItem.getProduct().getProductId(),
                orderItem.getProduct().getProductName(),
                orderItem.getQuantity(),
                orderItem.getSize(),
                orderItem.getColor(),
                orderItem.getDiscountPrice(),
                orderItem.getProduct().getThumbnail()
        );
    }
}
