package com.IT4409.backend.configurations;

import com.IT4409.backend.services.ColorService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ColorConfiguration {
    @Bean
    public ColorService colorService(){
        return new ColorService();
    }
}
