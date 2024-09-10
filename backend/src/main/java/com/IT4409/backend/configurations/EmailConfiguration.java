package com.IT4409.backend.configurations;

import com.IT4409.backend.services.EmailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailConfiguration {
    @Bean
    public EmailService emailService(){
        return new EmailService();
    }
}
