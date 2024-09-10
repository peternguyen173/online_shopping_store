package com.IT4409.backend.configurations;

import com.IT4409.backend.services.NotificationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotificationConfiguration {
    @Bean
    public NotificationService notificationService(){
        return new NotificationService();
    }
}
