package com.IT4409.backend.dtos.CategoryDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryRequestDTO {
    private Long categoryId;
    private String categoryName;
    private MultipartFile thumbnail;
}
