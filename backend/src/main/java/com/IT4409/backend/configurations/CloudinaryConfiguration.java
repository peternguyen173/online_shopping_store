package com.IT4409.backend.configurations;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfiguration {
    @Bean
    public Cloudinary getCloudinary()
    {
        Map config = new HashMap();
        config.put("cloud_name", "dhvjawiv2");
        config.put("api_key", "978417694499143");
        config.put("api_secret", "8IzfIgnURDUiSZNwjUTPynVVovc");
        config.put("secure", true);
        return new Cloudinary(config);
    }
}

