package com.IT4409.backend.services;

import com.IT4409.backend.dtos.CategoryDTO.CategoryRequestDTO;
import com.IT4409.backend.entities.Category;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CategoryRepository;
import com.IT4409.backend.services.interfaces.ICategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private ModelMapper modelMapper;
    public List<Category> getAllCategories() throws NotFoundException {
        List<Category> categories = categoryRepository.findAll();
        if(categories.isEmpty()) {
            throw new NotFoundException(messages.getString("category.validate.not-found"));
        }
        return categories;
    }

    public Category getById(Long categoryId) throws NotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
        return category;
    }

    @Override
    public Category createCategory(CategoryRequestDTO dto) throws Exception {
        if(categoryRepository.existsByCategoryName(dto.getCategoryName())) {
            throw new BadRequestException(messages.getString("category.validate.category-name.duplicate"));
        }
        String thumbnail = cloudinaryService.upload(dto.getThumbnail().getBytes(), dto.getThumbnail().getOriginalFilename(), "thumbnails");
        Category category = Category
                .builder()
                .categoryName(dto.getCategoryName())
                .thumbnail(thumbnail)
                .build();
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, CategoryRequestDTO dto) throws Exception {
        if(categoryRepository.existsByCategoryIdNotAndCategoryName(categoryId, dto.getCategoryName())) {
            throw new BadRequestException(messages.getString("category.validate.category-name.duplicate"));
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
        if(dto.getThumbnail() != null) {
            cloudinaryService.deleteImage(category.getThumbnail());
            String thumbnail = cloudinaryService.upload(dto.getThumbnail().getBytes(), dto.getThumbnail().getOriginalFilename(), "thumbnails");
            category.setThumbnail(thumbnail);
        }
        category.setCategoryName(dto.getCategoryName());
        return categoryRepository.save(category);
    }

    @Override
    public Category deleteCategory(Long categoryId) throws NotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
        categoryRepository.deleteById(categoryId);
        return category;
    }
}
