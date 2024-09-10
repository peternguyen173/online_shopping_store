package com.IT4409.backend.configurations;

import com.IT4409.backend.services.CartItemService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CartItemConfiguration {
    @Bean
    public CartItemService cartItemService(){
        return new CartItemService();
    }
}
