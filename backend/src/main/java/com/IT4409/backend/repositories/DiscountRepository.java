package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    Optional<Discount> findByDiscountCodeAndStatus(String discountCode, short available);

    boolean existsByDiscountCodeAndStatus(String discountCode, short available);

    List<Discount> findByEndDateBeforeOrEndDate(LocalDate today1, LocalDate today2);
}
