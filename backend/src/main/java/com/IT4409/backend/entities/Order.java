package com.IT4409.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "total_amount")
    private Long totalAmount;

    @Column(name = "discount_amount")
    private Long discountedAmount;

    @Column(name = "discount_from_voucher")
    private Long discountFromVoucher;

    @Column(name = "final_price")
    private Long finalPrice;

    @Column(name = "qr_link")
    private String qrLink;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @JsonIgnoreProperties("orderList")
//    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("order")
    private List<OrderItem> orderItemList;

    @ManyToOne
    @JoinColumn(name = "user_detail_id")
    @JsonIgnoreProperties("order")
    private UserDetail userDetail;
}
