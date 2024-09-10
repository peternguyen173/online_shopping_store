package com.IT4409.backend.configurations;

import com.IT4409.backend.services.OrderService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OrderConfiguration {
    @Bean
    public OrderService orderService(){
        return new OrderService();
    }
}
