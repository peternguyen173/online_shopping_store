package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryName(String categoryName);

    boolean existsByCategoryIdNotAndCategoryName(Long categoryId, String categoryName);
}
