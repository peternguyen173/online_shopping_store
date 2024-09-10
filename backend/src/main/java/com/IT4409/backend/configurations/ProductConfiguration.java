package com.IT4409.backend.configurations;

import com.IT4409.backend.services.ProductService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductConfiguration {
    @Bean
    public ProductService productService(){
        return new ProductService();
    }
}
