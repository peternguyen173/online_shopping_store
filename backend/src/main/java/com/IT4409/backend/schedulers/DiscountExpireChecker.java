package com.IT4409.backend.schedulers;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.repositories.DiscountRepository;
import com.IT4409.backend.services.DiscountService;
import com.IT4409.backend.services.EmailService;
import com.IT4409.backend.services.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

@Component
public class DiscountExpireChecker {
    @Autowired
    private DiscountService discountService;
    @Autowired
    private DiscountRepository discountRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private EmailService emailService;
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void checkVoucherExpiry() throws NotFoundException {
        LocalDate today = LocalDate.now();
        List<Discount> expiredDiscount = discountRepository.findByEndDateBeforeOrEndDate(today, today);
        for (Discount discount : expiredDiscount) {
            discount.setStatus(Constants.DISCOUNT_STATUS.OUT_OF_DATE);
            List<Cart> cartList = cartRepository.findByDiscountCode(discount.getDiscountCode());
            for (Cart cart : cartList) {
                cart.setDiscountCode(null);
                cartRepository.save(cart);
                notificationService.addDiscountNotification(cart.getUser().getUserId(), "Discount " + discount.getDiscountCode() + "is expired!");
            }
            discountRepository.save(discount);
        }
    }

    @Scheduled(cron = "0 0 8 ? * MON")
    public void sendWeeklyCartNotifications() throws MessagingException, NotFoundException {
        List<Cart> cartList = cartRepository.findAll();
        for(Cart cart : cartList) {
            List<CartItem> cartItemList = cart.getCartItemList();
            List<CartItem> outDatedCartItem = new ArrayList<>();

            for(CartItem cartItem : cartItemList) {
                LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
                if (cartItem.getCreateAt().isBefore(oneWeekAgo)) {
                    outDatedCartItem.add(cartItem);
                    Context context = new Context();
                    context.setVariable("product", cartItem.getProduct().getProductName());
                    emailService.sendEmailWithHtmlTemplate(cart.getUser().getEmail(), messages.getString("email.cart.reminder"), "cart-reminder", context);
                    notificationService.addNotification(cart.getUser().getUserId(),null,messages.getString("email.cart.reminder"));
                }
            }
        }
    }
}
