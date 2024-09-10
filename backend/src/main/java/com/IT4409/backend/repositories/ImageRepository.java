package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.ColorImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ColorImage, Long> {
}
