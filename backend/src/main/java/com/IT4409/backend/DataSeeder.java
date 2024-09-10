package com.IT4409.backend;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.Utils.Role;
import com.IT4409.backend.entities.Category;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.repositories.CategoryRepository;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void run(String...args) {
        String adminUsername = "admin@gmail.com";
        if (userRepository.findByEmail(adminUsername).isEmpty()) {
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("123456"));
            adminUser.setEmail(adminUsername);
            adminUser.setRole(Role.ADMIN.toString());
            adminUser.setCreatedAt(LocalDateTime.now());
            adminUser.setStatus(Constants.ENTITY_STATUS.ACTIVE);
            adminUser.setVerificationToken(UUID.randomUUID().toString());

            UserDetail userDetail = UserDetail
                    .builder()
                    .name("Vũ Việt Phương")
                    .phoneNumber("0963861815")
                    .user(adminUser)
                    .address("Hà Nội")
                    .build();
            adminUser = userRepository.save(adminUser);
            adminUser.setUserDetailList(new ArrayList<>());
            adminUser.getUserDetailList().add(userDetail);
            adminUser.setReviewList(new ArrayList<>());
            adminUser.setNotificationList(new ArrayList<>());
            adminUser.setOrderList(new ArrayList<>());
            userRepository.save(adminUser);
            cartService.createCart(adminUser);
        }

        // Pull code về chạy thì bỏ comment đoạn code này
        if(!categoryRepository.existsByCategoryName("QUẦN TÂY NỮ CÔNG SỞ")){
            categoryRepository.save(Category.builder().categoryName("QUẦN TÂY NỮ CÔNG SỞ").thumbnail("http://res.cloudinary.com/dj2lvmrop/image/upload/v1714919202/hustore/thumbnails/Qu%E1%BA%A7n.jpg.jpg").build());
        }
        if(!categoryRepository.existsByCategoryName("ÁO SƠ MI NỮ CÔNG SỞ")){
            categoryRepository.save(Category.builder().categoryName("ÁO SƠ MI NỮ CÔNG SỞ").thumbnail("http://res.cloudinary.com/dj2lvmrop/image/upload/v1714919873/hustore/thumbnails/%C3%81O%20S%C6%A0%20MI.jpeg.jpg").build());
        }
        if(!categoryRepository.existsByCategoryName("CHÂN VÁY")){
            categoryRepository.save(Category.builder().categoryName("CHÂN VÁY").thumbnail("http://res.cloudinary.com/dj2lvmrop/image/upload/v1714920462/hustore/thumbnails/CH%C3%82N%20V%C3%81Y.jpeg.jpg").build());
        }
        if(!categoryRepository.existsByCategoryName("PHỤ KIỆN")){
            categoryRepository.save(Category.builder().categoryName("PHỤ KIỆN").thumbnail("http://res.cloudinary.com/dj2lvmrop/image/upload/v1714921172/hustore/thumbnails/PH%E1%BB%A4%20KI%E1%BB%86N.jpg.jpg").build());
        }
    }
}
