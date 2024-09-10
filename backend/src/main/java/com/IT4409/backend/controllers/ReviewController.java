package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.ReviewDTO.ReviewRequestDTO;
import com.IT4409.backend.entities.Review;
import com.IT4409.backend.services.ReviewService;
import com.IT4409.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<?> getProductReviews(@PathVariable("productId") Long productId) {
        try {
            List<Review> reviewList = reviewService.getProductReviews(productId);
            return new ResponseEntity<>(reviewList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<?> getReviewById(@PathVariable("reviewId") Long reviewId) {
        try {
            Review review = reviewService.getReviewById(reviewId);
            return new ResponseEntity<>(review, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(value = "api/order/{orderId}/order-items/{orderItemId}/review", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addReview (@RequestHeader("Authorization") String jwt,
                                        @PathVariable("orderId") Long orderId,
                                        @PathVariable("orderItemId") Long orderItemId,
                                        @RequestBody ReviewRequestDTO reviewRequestDTO) {
        try{
            Review review = reviewService.addReview(jwt, orderId, orderItemId, reviewRequestDTO);
            return new ResponseEntity<>(review, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(value = "api/reviews/{reviewId}", method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editReview (@RequestHeader("Authorization") String jwt,
                                         @PathVariable("reviewId") Long reviewId,
                                         @RequestBody ReviewRequestDTO reviewRequestDTO) {
        try{
            Review review = reviewService.editReview(jwt, reviewId, reviewRequestDTO);
            return new ResponseEntity<>(review, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("api/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview (@RequestHeader("Authorization") String jwt,
                                           @PathVariable("reviewId") Long reviewId) {
        try{
            Review review = reviewService.deleteReview(jwt, reviewId);
            return new ResponseEntity<>(review, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
