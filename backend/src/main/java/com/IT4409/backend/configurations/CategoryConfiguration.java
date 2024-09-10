package com.IT4409.backend.configurations;

import com.IT4409.backend.services.CategoryService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoryConfiguration {
    @Bean
    public CategoryService categoryService() {
        return new CategoryService();
    }
}
