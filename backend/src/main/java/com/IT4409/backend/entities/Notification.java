package com.IT4409.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private long notificationId;

    @Column(name = "order_id")
    private long orderId;

    @Column(name = "notification_time")
    private LocalDateTime notificationTime;

    @Column(name = "text")
    private String text;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @JsonIgnoreProperties("notificationList")
//    private User user;
}
