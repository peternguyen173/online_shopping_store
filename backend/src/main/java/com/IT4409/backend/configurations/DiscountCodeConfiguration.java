package com.IT4409.backend.configurations;

import com.IT4409.backend.services.DiscountService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DiscountCodeConfiguration {
    @Bean
    public DiscountService discountCodeService(){
        return new DiscountService();
    }
}
