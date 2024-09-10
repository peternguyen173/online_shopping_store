package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(
            "SELECT p FROM Product p WHERE p.productName LIKE %:#{#productName}% AND p.status = 1"
    )
    List<Product> searchProduct(@Param("productName") String productName);

    List<Product> findTop8ByOrderByCreatedAtDesc();

    List<Product> findTop8ByOrderByRatingDesc();
}
