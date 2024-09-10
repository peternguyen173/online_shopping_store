package com.IT4409.backend.configurations;

import com.IT4409.backend.services.ReviewService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class ReviewConfiguration {
    @Bean
    public ReviewService reviewService(){
        return new ReviewService();
    }
}
