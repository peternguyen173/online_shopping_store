package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.GptDTO.GptRequestDTO;
import com.IT4409.backend.dtos.GptDTO.GptResponseDTO;
import com.IT4409.backend.entities.Review;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class GptController {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ReviewService reviewService;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @GetMapping("products/{productId}/reviews/summarize")
    public String summarizeProductReview(@PathVariable("productId") Long productId) throws Exception {
        String prompt = "Hãy tóm tắt các bình luận được cung cấp, biết các bình luận ngăn cách với nhau bằng dấu '|', " +
                "dưới dạng: \"Phần lớn khách hàng ..., tuy nhiên một số chưa hài lòng về ..., một số khác cho rằng ...\"";
//        String prompt = "Hãy cho tôi các bình luận cho sản phẩm áo, bao gồm cả tích cực lẫn tiêu cực";
        List<Review> reviewList = reviewService.getProductReviews(productId);
        for(Review review : reviewList) {
            prompt += review.getComment() + " | ";
        }
        GptRequestDTO request = new GptRequestDTO(model, prompt);
        // call the API
        GptResponseDTO response = restTemplate.postForObject(apiUrl, request, GptResponseDTO.class);
        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }
        // return the first response
        return response.getChoices().get(0).getMessage().getContent();
    }
}
