package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.Utils.OrderStatus;
import com.IT4409.backend.Utils.PaymentMethod;
import com.IT4409.backend.Utils.PaymentStatus;
import com.IT4409.backend.dtos.OrderDTO.DailyRevenueDTO;
import com.IT4409.backend.dtos.OrderDTO.OrderRequestDTO;
import com.IT4409.backend.dtos.OrderDTO.OrderResponseDTO;
import com.IT4409.backend.dtos.OrderItemDTO.OrderItemResponseDTO;
import com.IT4409.backend.dtos.UserDetailDTO.UserDetailResponseDTO;
import com.IT4409.backend.entities.*;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.*;
import com.IT4409.backend.services.interfaces.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.IT4409.backend.Utils.Constants.messages;

public class OrderService implements IOrderService {
    @Autowired
    private UserService userService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private DiscountRepository discountRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<OrderResponseDTO> getAllOrders() throws NotFoundException {
        List<Order> orderList = orderRepository.findAllByOrderByCreatedAtDesc();
        if(orderList.isEmpty()) {
            throw new NotFoundException(messages.getString("order.validate.not-found"));
        }
        return orderList
                .stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO confirmOrderPayment(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setPaymentStatus(PaymentStatus.COMPLETED.toString());
        notificationService.addNotification(order.getUserId(), orderId, "Đơn hàng #" + orderId + " của bạn đã được thanh toán thành công");
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public OrderResponseDTO confirmOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.CONFIRMED.toString());
        notificationService.addNotification(order.getUserId(), orderId, "Đơn hàng #" + orderId + " của bạn đã được xác nhận");
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public OrderResponseDTO shipOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.SHIPPED.toString());
        notificationService.addNotification(order.getUserId(), orderId, "Đơn hàng #" + orderId + " của bạn đã được gửi đi");
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public OrderResponseDTO deliverOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.DELIVERED.toString());
        notificationService.addNotification(order.getUserId(), orderId, "Đơn hàng #" + orderId + " của bạn đã được giao thành công");
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public OrderResponseDTO cancelOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        for(OrderItem orderItem : order.getOrderItemList()) {
            Product product = orderItem.getProduct();
            product.setQuantityInStock(product.getQuantityInStock() + orderItem.getQuantity());
            productRepository.save(product);
        }
        order.setOrderStatus(OrderStatus.CANCELLED.toString());
        notificationService.addNotification(order.getUserId(), orderId, "Đơn hàng #" + orderId + " của bạn đã bị hủy");
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public OrderResponseDTO deleteOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderItemList(null);
        orderRepository.save(order);
        orderRepository.deleteById(orderId);
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public OrderResponseDTO createOrder(String jwt, OrderRequestDTO orderRequestDTO) throws Exception {
        Long totalAmount = 0L;
        Long discountedAmount = 0L;
        User user = userService.findUserByJwt(jwt);
        Cart cart = user.getCart();
        List<OrderItem> orderItemList = new ArrayList<>();

        Order order = orderRepository.save(new Order());
        List<CartItem> itemsToDelete = new ArrayList<>();

        for (CartItem cartItem : new ArrayList<>(cart.getCartItemList())) {
            if (cartItem.getProduct().getStatus() == Constants.PRODUCT_STATUS.OUT_OF_STOCK) {
                throw new BadRequestException(messages.getString("product.validate.out-of-stock"));
            }

            // Kiểm tra số lượng hàng hóa
            Product product = cartItem.getProduct();
            if(product.getQuantityInStock() < cartItem.getQuantity()){
                throw new BadRequestException(messages.getString("product.validate.insufficient"));
            } else {
                product.setQuantityInStock(product.getQuantityInStock() - cartItem.getQuantity());
                if(product.getQuantityInStock() == 0) {
                    product.setStatus(Constants.PRODUCT_STATUS.OUT_OF_STOCK);
                }
                notificationService.sendProductOutOfStockNotification();
                productRepository.save(product);
            }

            // Tạo item trong đơn hàng
            OrderItem orderItem = new OrderItem();
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSize(cartItem.getSize());
            orderItem.setColor(cartItem.getColor());
            orderItem.setDiscountPrice(cartItem.getDiscountPrice());
            orderItem.setOrder(order);

            // Tính tổng tiền
            totalAmount += orderItem.getDiscountPrice();
            // Tính số tiền đã giảm từ hàng hóa
            discountedAmount = discountedAmount + (cartItem.getPrice() - cartItem.getDiscountPrice());

            // Lưu item
            orderItem = orderItemRepository.save(orderItem);
            orderItemList.add(orderItem);

            // Xóa đồ trong giỏ hàng
//            cart.getCartItemList().remove(cartItem);
//            cartItemRepository.delete(cartItem);

            // Xóa đồ trong giỏ hàng
//            cart.setCartItemList(new ArrayList<>());
            itemsToDelete.add(cartItem);
            cartRepository.save(cart);
        }

        for (CartItem item : itemsToDelete) {
            cart.getCartItemList().remove(item);
            cartItemRepository.delete(item);
        }

        cartRepository.save(cart);

        if (orderRequestDTO.getUserDetailId() != null && orderRequestDTO.getUserDetailRequestDTO() == null) {
            UserDetail userDetail = user.getUserDetailList()
                    .stream()
                    .filter(userDetail1 -> userDetail1.getUserDetailId() == orderRequestDTO.getUserDetailId())
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException(messages.getString("user-detail.validate.not-found")));
            order.setUserDetail(userDetail);
        } else if (orderRequestDTO.getUserDetailId() == null && orderRequestDTO.getUserDetailRequestDTO() != null){
            UserDetail newUserDetail = UserDetail
                    .builder()
                    .address(orderRequestDTO.getUserDetailRequestDTO().getAddress())
                    .name(orderRequestDTO.getUserDetailRequestDTO().getName())
                    .phoneNumber(orderRequestDTO.getUserDetailRequestDTO().getPhoneNumber())
                    .user(user)
                    .build();
            user.getUserDetailList().add(newUserDetail);
            userRepository.save(user);

            UserDetail savedUserDetail = user.getUserDetailList()
                    .stream()
                    .filter(detail -> detail.getAddress().equals(newUserDetail.getAddress())
                            && detail.getName().equals(newUserDetail.getName())
                            && detail.getPhoneNumber().equals(newUserDetail.getPhoneNumber()))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException(messages.getString("user-detail.validate.not-found")));

            order.setUserDetail(savedUserDetail);
        } else {
            throw new BadRequestException(messages.getString("user-detail.validate.more-than-one"));
        }

        // Shipping fee
        totalAmount += Constants.SHIPPING_FEE.OUTSIDE_HANOI;

        order.setCreatedAt(LocalDateTime.now());
        order.setUserId(user.getUserId());
        order.setOrderItemList(orderItemList);
        order.setTotalAmount(totalAmount);
        order.setDiscountedAmount(discountedAmount);
        // Áp dụng voucher
        if(cart.getDiscountCode() != null && isDiscountValid(order, cart.getDiscountCode())) {
            Discount discount = discountRepository.findByDiscountCodeAndStatus(cart.getDiscountCode(), Constants.DISCOUNT_STATUS.AVAILABLE).get();
            order.setDiscountFromVoucher(Math.min( (long) (order.getTotalAmount() * discount.getDiscountValue()), discount.getMaxPossibleValue()));
            order.setFinalPrice(order.getTotalAmount() - order.getDiscountFromVoucher() );
        }
        else {
            order.setFinalPrice(order.getTotalAmount());
        }
        order = orderRepository.save(order);
        // Sinh QR thanh toán
        order.setPaymentMethod(orderRequestDTO.getPaymentMethod());
        if (order.getPaymentMethod().equals(PaymentMethod.NET_BANKING.name())) {
            String qr = Constants.qrLink.replace("{amount}", order.getFinalPrice().toString());
            qr = qr.replace("{addInfo}", "Order%20" + order.getOrderId());
            order.setQrLink(qr);
        }
        order.setOrderStatus(OrderStatus.PENDING.toString());
        order.setPaymentStatus(PaymentStatus.PENDING.toString());

        user.getOrderList().add(order);
        userRepository.save(user);

        notificationService.addNotification(1L, order.getOrderId(), "Đơn hàng #" + order.getOrderId() + " đã được tạo");
        notificationService.addNotification(order.getUserId(), order.getOrderId(), "Đơn hàng #" + order.getOrderId() + " của bạn đã được tạo");
        return convertToOrderResponseDTO(orderRepository.save(order));
    }

    @Override
    public List<OrderResponseDTO> getOrderHistory(long userId) {
        return orderRepository
                .findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO getOrderByOrderIdAndUserId(String jwt, Long orderId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Order order = user.getOrderList()
                .stream()
                .filter(order1 -> Objects.equals(order1.getOrderId(), orderId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        return convertToOrderResponseDTO(order);
    }

    @Override
    public List<DailyRevenueDTO> getWeeklyRevenue() {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY).plusDays(1);

        List<Order> orders = orderRepository.findOrdersForCurrentWeek(startOfWeek.atStartOfDay(), endOfWeek.atStartOfDay());

        Map<DayOfWeek, Double> revenueMap = new HashMap<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            revenueMap.put(day, 0.0);
        }

        for (Order order : orders) {
            if(Objects.equals(order.getOrderStatus(), OrderStatus.DELIVERED.toString())) {
                DayOfWeek day = order.getCreatedAt().getDayOfWeek();
                double currentRevenue = revenueMap.get(day);
                revenueMap.put(day, currentRevenue + order.getFinalPrice());
            }
        }

        List<DailyRevenueDTO> dailyRevenueList = new ArrayList<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            double revenue = revenueMap.get(day) / 1_000_000; // Chia tổng doanh thu cho 1 triệu
            String dayInVietnamese = convertDayToVietnamese(day);
            dailyRevenueList.add(new DailyRevenueDTO(revenue, dayInVietnamese));
        }
        return dailyRevenueList;
    }

    @Override
    public Long getAllRevenue() {
        Long totalRevenue = 0L;
        List<Order> orderList = orderRepository.findByOrderStatus(OrderStatus.DELIVERED.toString());
        for (Order order : orderList) {
            totalRevenue += order.getFinalPrice();
        }
        return totalRevenue;
    }

    @Override
    public OrderResponseDTO getOrderById(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        return convertToOrderResponseDTO(order);
    }

    private boolean isDiscountValid(Order order, String discountCode) throws BadRequestException {
        Optional<Discount> discountOptional = discountRepository.findByDiscountCodeAndStatus(discountCode, Constants.DISCOUNT_STATUS.AVAILABLE);
        if(discountOptional.isEmpty()){
            return false;
        }
        Discount discount = discountOptional.get();
        if(discount.getMinCondition() > order.getTotalAmount()) {
            return false;
        }
        return true;
    }

    private OrderResponseDTO convertToOrderResponseDTO(Order order) {
        List<OrderItemResponseDTO> orderItemList = order.getOrderItemList()
                .stream()
                .map(this::convertToOrderItemResponseDTO)
                .collect(Collectors.toList());

        UserDetailResponseDTO userDetail = convertToUserDetailResponseDTO(order.getUserDetail());

        return new OrderResponseDTO(
                order.getOrderId(),
                order.getUserId(),
                order.getOrderStatus(),
                order.getPaymentStatus(),
                order.getPaymentMethod(),
                order.getCreatedAt(),
                order.getTotalAmount(),
                order.getDiscountedAmount(),
                order.getDiscountFromVoucher(),
                order.getFinalPrice(),
                order.getQrLink(),
                orderItemList,
                userDetail
        );
    }

    private OrderItemResponseDTO convertToOrderItemResponseDTO(OrderItem orderItem) {
        return new OrderItemResponseDTO(
                orderItem.getOrderItemId(),
                orderItem.getOrder().getOrderId(),
                orderItem.getProduct().getProductId(),
                orderItem.getProduct().getProductName(),
                orderItem.getQuantity(),
                orderItem.getSize(),
                orderItem.getColor(),
                orderItem.getDiscountPrice(),
                orderItem.getProduct().getThumbnail()
        );
    }

    private UserDetailResponseDTO convertToUserDetailResponseDTO(UserDetail userDetail) {
        return new UserDetailResponseDTO(
                userDetail.getUserDetailId(),
                userDetail.getName(),
                userDetail.getAddress(),
                userDetail.getPhoneNumber()
        );
    }

    private String convertDayToVietnamese(DayOfWeek day) {
        switch (day) {
            case MONDAY:
                return "Thứ hai";
            case TUESDAY:
                return "Thứ ba";
            case WEDNESDAY:
                return "Thứ tư";
            case THURSDAY:
                return "Thứ năm";
            case FRIDAY:
                return "Thứ sáu";
            case SATURDAY:
                return "Thứ bảy";
            case SUNDAY:
                return "Chủ nhật";
            default:
                return "";
        }
    }
}
