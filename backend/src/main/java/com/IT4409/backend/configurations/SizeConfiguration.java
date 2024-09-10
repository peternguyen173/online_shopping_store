package com.IT4409.backend.configurations;

import com.IT4409.backend.services.SizeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SizeConfiguration {
    @Bean
    public SizeService sizeService(){
        return new SizeService();
    }
}
