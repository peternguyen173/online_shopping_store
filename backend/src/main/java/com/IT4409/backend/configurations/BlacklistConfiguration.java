package com.IT4409.backend.configurations;

import com.IT4409.backend.services.BlacklistService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BlacklistConfiguration {
    @Bean
    public BlacklistService blacklistService(){
        return new BlacklistService();
    }
}
