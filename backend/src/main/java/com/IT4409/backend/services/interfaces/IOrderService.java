package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.OrderDTO.DailyRevenueDTO;
import com.IT4409.backend.dtos.OrderDTO.OrderRequestDTO;
import com.IT4409.backend.dtos.OrderDTO.OrderResponseDTO;
import com.IT4409.backend.exceptions.NotFoundException;

import java.util.List;

public interface IOrderService {
    List<OrderResponseDTO> getAllOrders() throws NotFoundException;
    OrderResponseDTO confirmOrderPayment(Long orderId) throws NotFoundException;

    OrderResponseDTO confirmOrder(Long orderId) throws NotFoundException;

    OrderResponseDTO shipOrder(Long orderId) throws NotFoundException;

    OrderResponseDTO deliverOrder(Long orderId) throws NotFoundException;

    OrderResponseDTO cancelOrder(Long orderId) throws NotFoundException;

    OrderResponseDTO deleteOrder(Long orderId) throws NotFoundException;

    OrderResponseDTO createOrder(String jwt, OrderRequestDTO dto) throws Exception;

    List<OrderResponseDTO> getOrderHistory(long userId);

    OrderResponseDTO getOrderByOrderIdAndUserId(String jwt, Long orderId) throws Exception;

    List<DailyRevenueDTO> getWeeklyRevenue();

    Long getAllRevenue();

    OrderResponseDTO getOrderById(Long orderId) throws NotFoundException;
}
