package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.ReviewDTO.ReviewRequestDTO;
import com.IT4409.backend.entities.Review;

import java.util.List;

public interface IReviewService {
    List<Review> getProductReviews(Long productId) throws Exception;

    Review getReviewById(Long reviewId) throws Exception;

    Review addReview(String jwt, Long orderId, Long orderItemId, ReviewRequestDTO reviewRequestDTO) throws Exception;

    Review editReview(String jwt, Long reviewId, ReviewRequestDTO reviewRequestDTO) throws Exception;

    Review deleteReview(String jwt, Long reviewId) throws Exception;
}
