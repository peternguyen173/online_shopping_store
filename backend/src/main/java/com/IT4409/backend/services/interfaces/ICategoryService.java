package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.CategoryDTO.CategoryRequestDTO;
import com.IT4409.backend.entities.Category;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories() throws NotFoundException;
    Category getById(Long categoryId) throws NotFoundException;
    Category createCategory(CategoryRequestDTO dto) throws Exception;
    Category updateCategory(Long categoryId, CategoryRequestDTO dto) throws Exception;
    Category deleteCategory(Long categoryId) throws NotFoundException;
}
