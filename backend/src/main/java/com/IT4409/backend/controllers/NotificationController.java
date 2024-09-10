package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.NotificationDTO.NotificationResponseDTO;
import com.IT4409.backend.entities.Notification;
import com.IT4409.backend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @RequestMapping(path = "", method = RequestMethod.GET)
    public ResponseEntity<?> getAllNotifications(@RequestHeader("Authorization") String jwt) {
        try {
            List<NotificationResponseDTO> notifications = notificationService.getNotificationsByUserId(jwt);
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{userId}/orders/{orderId}")
    public ResponseEntity<?> addNotification(@PathVariable("userId") Long userId,
                                             @PathVariable("orderId") Long orderId,
                                             @RequestBody String text) {
        try {
            Notification notification = notificationService.addNotification(userId, orderId, text);
            return ResponseEntity.ok(notification);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{notificationId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteNotification(@RequestHeader("Authorization") String jwt,
                                                     @PathVariable Long notificationId) {
        try {
            Notification notification = notificationService.deleteNotification(jwt, notificationId);
            return new ResponseEntity<>(notification, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAllNotifications(@RequestHeader("Authorization") String jwt) {
        try {
            List<Notification> notificationList = notificationService.deleteAllNotifications(jwt);
            return new ResponseEntity<>(notificationList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
