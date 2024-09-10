package com.IT4409.backend.services;

import com.IT4409.backend.Utils.OrderStatus;
import com.IT4409.backend.dtos.ReviewDTO.ReviewRequestDTO;
import com.IT4409.backend.entities.*;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.*;
import com.IT4409.backend.services.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.IT4409.backend.Utils.Constants.messages;

public class ReviewService implements IReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Override
    public List<Review> getProductReviews(Long productId) throws Exception {
        List<Review> reviewList = new ArrayList<>();
        List<OrderItem> orderItemList = orderItemRepository.findByProductProductId(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        for(OrderItem orderItem : orderItemList) {
            if(orderItem.getReview() != null){
                reviewList.add(orderItem.getReview());
            }
        }
        return reviewList;
    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(messages.getString("review.validate.not-found")));
    }

    @Override
    public Review addReview(String jwt, Long orderId, Long orderItemId, ReviewRequestDTO reviewRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Order order = user.getOrderList()
                .stream()
                .filter(order1 -> Objects.equals(order1.getOrderId(), orderId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        if(!order.getOrderStatus().equals(OrderStatus.DELIVERED.toString())) {
            throw new BadRequestException(messages.getString("order.validate.can-not-review"));
        }
        OrderItem orderItem = order.getOrderItemList()
                .stream()
                .filter(item -> Objects.equals(item.getOrderItemId(), orderItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order-item.validate.not-found")));
        if(orderItem.getReview() != null) {
            throw new BadRequestException(messages.getString("review.validate.already-exist"));
        }

        Product product = orderItem.getProduct();
        Review review = new Review();
        review.setUserId(user.getUserId());
        review.setOrderItem(orderItem);
        review.setRatingValue(reviewRequestDTO.getRatingValue());
        review.setComment(reviewRequestDTO.getComment());
        review.setCreatedAt(LocalDateTime.now());

        if(user.getReviewList() == null) user.setReviewList(new ArrayList<>());
        user.getReviewList().add(review);

        orderItemRepository.save(orderItem);
        review = reviewRepository.save(review);

        List<Review> reviewList = getProductReviews(review.getOrderItem().getProduct().getProductId());
        double averageRating = reviewList
                .stream()
                .mapToDouble(Review::getRatingValue)
                .average()
                .orElse(0.0);
        averageRating = Math.round(averageRating * 10.0) / 10.0; // làm tròn
        product.setRating(averageRating);
        productRepository.save(product);
        return reviewRepository.save(review);
    }

    @Override
    public Review editReview(String jwt, Long reviewId, ReviewRequestDTO reviewRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Review review = user.getReviewList()
                .stream()
                .filter(review1 -> Objects.equals(review1.getReviewId(), reviewId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("review.validate.not-found")));
        Product product = review.getOrderItem().getProduct();
        review.setRatingValue(reviewRequestDTO.getRatingValue());
        review.setComment(reviewRequestDTO.getComment());
        review = reviewRepository.save(review);

        List<Review> reviewList = getProductReviews(review.getOrderItem().getProduct().getProductId());
        double averageRating = 0.0;
        for (Review review1 : reviewList) {
            averageRating += review1.getRatingValue();
        }
        averageRating = averageRating / reviewList.size(); // làm tròn
        product.setRating(averageRating);
        productRepository.save(product);
        return reviewRepository.save(review);
    }

    @Override
    public Review deleteReview(String jwt, Long reviewId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Review review = user.getReviewList()
                .stream()
                .filter(review1 -> Objects.equals(review1.getReviewId(), reviewId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("review.validate.not-found")));
        Product product = review.getOrderItem().getProduct();
        user.getReviewList().remove(review);
        userRepository.save(user);
        List<Review> reviewList = getProductReviews(review.getOrderItem().getProduct().getProductId());
        double averageRating = reviewList.stream()
                .mapToDouble(Review::getRatingValue)
                .average()
                .orElse(0.0);
        averageRating = Math.round(averageRating * 10.0) / 10.0; // làm tròn
        product.setRating(averageRating);
        productRepository.save(product);
        return review;
    }
}
