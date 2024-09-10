package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserUserId(long userId);

    List<Cart> findByDiscountCode(String discountCode);
}
