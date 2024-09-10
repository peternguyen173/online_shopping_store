package com.IT4409.backend.configurations;

import com.IT4409.backend.services.CartService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CartConfiguration {
    @Bean
    public CartService cartService(){
        return new CartService();
    }
}
