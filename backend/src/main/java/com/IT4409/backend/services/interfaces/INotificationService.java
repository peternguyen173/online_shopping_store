package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.NotificationDTO.NotificationResponseDTO;
import com.IT4409.backend.entities.Notification;
import com.IT4409.backend.exceptions.NotFoundException;

import java.util.List;

public interface INotificationService {
    List<NotificationResponseDTO> getNotificationsByUserId(String jwt) throws Exception;

    Notification addNotification(Long userId, Long orderId, String text) throws NotFoundException;
    Notification addDiscountNotification(Long userId, String text) throws NotFoundException;

    Notification deleteNotification(String jwt, Long notificationId) throws Exception;

    List<Notification> deleteAllNotifications(String jwt) throws Exception;
}
