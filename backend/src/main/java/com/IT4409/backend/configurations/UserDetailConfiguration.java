package com.IT4409.backend.configurations;

import com.IT4409.backend.services.CustomerDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserDetailConfiguration {
    @Bean
    public CustomerDetailService userDetailService(){
        return new CustomerDetailService();
    }
}
