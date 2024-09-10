package com.IT4409.backend.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "status")
    private Short status;

    @Column(name = "verificationToken")
    private String verificationToken;

    @Column(name = "role")
    private String role;

    @Column(name = "create_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnoreProperties("user")
    private List<UserDetail> userDetailList;

    @OneToMany(/*mappedBy = "user",*/ cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnoreProperties("user")
    private List<Review> reviewList;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("user")
    private Cart cart;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Order> orderList;

    @OneToMany(/*mappedBy = "user",*/ cascade = CascadeType.ALL)
//    @JsonIgnoreProperties("user")
    private List<Notification> notificationList;
}
