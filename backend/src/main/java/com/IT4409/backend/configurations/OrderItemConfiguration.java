package com.IT4409.backend.configurations;

import com.IT4409.backend.services.OrderItemService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OrderItemConfiguration {
    @Bean
    public OrderItemService orderItemService(){
        return new OrderItemService();
    }
}
