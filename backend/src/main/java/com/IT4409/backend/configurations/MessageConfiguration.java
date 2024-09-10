package com.IT4409.backend.configurations;

import com.IT4409.backend.services.MessageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfiguration {
    @Bean
    public MessageService messageService(){
        return new MessageService();
    }
}
