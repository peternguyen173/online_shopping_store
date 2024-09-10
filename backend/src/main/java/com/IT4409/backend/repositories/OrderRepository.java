package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByCreatedAtDesc();
//    List<Order> findAllByUserUserId(long userId);
    List<Order> findAllByUserIdOrderByCreatedAtDesc(long userId);
    @Query("SELECT o FROM Order o WHERE o.createdAt >= :startOfWeek AND o.createdAt < :endOfWeek")
    List<Order> findOrdersForCurrentWeek(@Param("startOfWeek") LocalDateTime startOfWeek, @Param("endOfWeek") LocalDateTime endOfWeek);

    List<Order> findByOrderStatus(String toString);
}
