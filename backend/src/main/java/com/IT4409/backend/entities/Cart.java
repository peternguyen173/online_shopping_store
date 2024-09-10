package com.IT4409.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "carts")
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("cart")
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("cart")
    private List<CartItem> cartItemList;

    @Column(name = "total_price")
    private Long totalPrice;

    @Column(name = "total_item")
    private Integer totalItem;

    @Column(name = "discount_code")
    private String discountCode;

    @Column(name = "total_discount_price")
    private Long totalDiscountPrice;

    @Column(name = "discounted_amount")
    private Long discountedAmount;
}
