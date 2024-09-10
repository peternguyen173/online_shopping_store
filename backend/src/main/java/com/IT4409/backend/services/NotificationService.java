package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.NotificationDTO.NotificationResponseDTO;
import com.IT4409.backend.entities.*;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.repositories.NotificationRepository;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.services.interfaces.INotificationService;
import jakarta.mail.MessagingException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.IT4409.backend.Utils.Constants.messages;

public class NotificationService implements INotificationService {
    @Autowired
    private UserService userService;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CartRepository cartRepository;
    @Override
    public List<NotificationResponseDTO> getNotificationsByUserId(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
//        List<Notification> notificationList = notificationRepository.findByUserUserIdOrderByNotificationTimeDesc(user.getUserId());
        List<Notification> notificationList = user.getNotificationList();
        if(notificationList.isEmpty()) {
            throw new NotFoundException(messages.getString("notification.validate.not-found"));
        }
        Collections.sort(notificationList, Comparator.comparing(Notification::getNotificationTime).reversed());
        return notificationList
                .stream()
                .map(notification -> modelMapper.map(notification, NotificationResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Notification addNotification(Long userId, Long orderId, String text) throws NotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        Notification notification = Notification
                .builder()
//                .user(user)
                .text(text)
                .notificationTime(LocalDateTime.now())
                .build();
        if(orderId != null) {
            notification.setOrderId(orderId);
        }
        if(user.getNotificationList() == null) user.setNotificationList(new ArrayList<>());
        user.getNotificationList().add(notification);
        userRepository.save(user);
        return notification;
    }

    @Override
    public Notification addDiscountNotification(Long userId, String text) throws NotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        Notification notification = Notification
                .builder()
//                .user(user)
                .text(text)
                .notificationTime(LocalDateTime.now())
                .build();
        if(user.getNotificationList() == null) user.setNotificationList(new ArrayList<>());
        user.getNotificationList().add(notification);
        userRepository.save(user);
        return notification;
    }

    @Override
    public Notification deleteNotification(String jwt, Long notificationId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Notification> notificationList = user.getNotificationList();
        Notification deletedNotification = notificationList
                .stream()
                .filter(notification -> Objects.equals(notification.getNotificationId(), notificationId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("notification.validate.not-found")));
       user.getNotificationList().remove(deletedNotification);
       userRepository.save(user);
        return deletedNotification;
    }

    @Override
    public List<Notification> deleteAllNotifications(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Notification> notificationList = user.getNotificationList();
        if (!notificationList.isEmpty()) {
            for (Notification notification : notificationList) {
                notificationList.remove(notification);
            }
        }
        userRepository.save(user);
        return notificationList;
    }
    public void sendProductOutOfStockNotification() throws MessagingException, NotFoundException {
        List<Cart> cartList = cartRepository.findAll();
        for (Cart cart : cartList) {
            List<CartItem> cartItemList = cart.getCartItemList();
            if (cartItemList != null) {
                List<CartItem> itemsToRemove = new ArrayList<>();
                for (CartItem cartItem : cartItemList) {
                    Product product = cartItem.getProduct();
                    if (cartItem.getQuantity() > product.getQuantityInStock() || product.getStatus() == Constants.PRODUCT_STATUS.OUT_OF_STOCK) {
                        addNotification(cart.getUser().getUserId(), null, String.format(messages.getString("cart-item.notification.out-of-stock"), product.getProductName()));
                        itemsToRemove.add(cartItem);
                    }
                }
                cartItemList.removeAll(itemsToRemove);
                cartRepository.save(cart);
            }
        }
    }
}
