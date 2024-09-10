package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.ColorDTO.ColorRequestDTO;
import com.IT4409.backend.dtos.ProductDTO.ProductRequestDTO;
import com.IT4409.backend.entities.Category;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.OrderItem;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.*;
import com.IT4409.backend.services.interfaces.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.IT4409.backend.Utils.Constants.messages;

public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ColorService colorService;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<Product> getAllProducts() throws Exception {
        List<Product> productList = productRepository.findAll();
        if(productList.isEmpty()) {
            throw new NotFoundException(messages.getString("product.validate.not-found"));
        }
        return productList;
    }

    @Override
    public Product getProductById(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        return product;
    }

    @Override
    public List<Product> searchProduct(String productName) throws NotFoundException {
        List<Product> productList = productRepository.searchProduct(productName);
        if(productList.isEmpty()) {
            throw new NotFoundException(messages.getString("product.validate.not-found"));
        }
        return productList;
    }

    public Product createProduct(ProductRequestDTO productRequestDTO) throws Exception {
        Product product = modelMapper.map(productRequestDTO, Product.class);
        product.setStatus(Constants.PRODUCT_STATUS.IN_STOCK);
        List<Color> colorList = new ArrayList<>();
        Category category = categoryRepository.findById(productRequestDTO.getCategoryId())
                .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
        product = productRepository.save(product);
        for(ColorRequestDTO colorRequestDTO : productRequestDTO.getColorRequestDTOList()){
            Color color = colorRepository.save(Color
                    .builder()
                    .colorName(colorRequestDTO.getColorName())
                    .productId(product.getProductId())
                    .colorImageList(new ArrayList<>())
                    .build());
            color = colorService.addImageToColor(product.getProductId(), color.getColorId(), colorRequestDTO.getImageList());
            colorList.add(color);
        }
        product.setThumbnail(cloudinaryService.upload(productRequestDTO.getThumbnail().getBytes(), productRequestDTO.getThumbnail().getOriginalFilename(), "thumbnails"));
        product.setSizeList(productRequestDTO.getSizeList());
        product.setColorList(colorList);
        product.setCategory(category);
        product.setRating(0.0);
        product.setCreatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, ProductRequestDTO productRequestDTO) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        if(productRequestDTO.getProductName() != null && !"".equals(productRequestDTO.getProductName())) {
            product.setProductName(productRequestDTO.getProductName());
        }
        if(productRequestDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productRequestDTO.getCategoryId())
                    .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
            product.setCategory(category);
        }
        if(productRequestDTO.getPrice() != null) {
            product.setPrice(productRequestDTO.getPrice());
        }
        if(productRequestDTO.getDiscountPrice() != null) {
            product.setDiscountPrice(productRequestDTO.getDiscountPrice());
        }
        if(productRequestDTO.getQuantityInStock() != null) {
            product.setQuantityInStock(productRequestDTO.getQuantityInStock());
            if (productRequestDTO.getQuantityInStock() == 0) {
                product.setStatus(Constants.PRODUCT_STATUS.OUT_OF_STOCK);
                notificationService.sendProductOutOfStockNotification();
            } else {
                product.setStatus(Constants.PRODUCT_STATUS.IN_STOCK);
            }
        }
        product = productRepository.save(product);
        return product;
    }

    @Override
    public Product deleteProduct(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        List<Color> colorList = product.getColorList();
        for(Color color : colorList) {
            colorRepository.delete(color);
        }
        Optional<List<OrderItem>> orderItemList = orderItemRepository.findByProductProductId(productId);
        if(orderItemList.isPresent() && !orderItemList.get().isEmpty()) {
            for (OrderItem orderItem : orderItemList.get()) {
                orderItemRepository.delete(orderItem);
            }
        }
        productRepository.deleteById(productId);
        return product;
    }

    @Override
    public List<Product> getSaleProducts() {
        List<Product> allProducts = productRepository.findAll();
        return allProducts.stream()
                .filter(product -> product.getPrice() > 0 && product.getDiscountPrice() != null && product.getDiscountPrice() > 0)
                .sorted(Comparator.comparingDouble(this::calculateDiscountRate).reversed())
                .limit(8) // Giới hạn số lượng sản phẩm trả về là 8
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> getNewestProducts() {
        return productRepository.findTop8ByOrderByCreatedAtDesc();
    }

    @Override
    public List<Product> getBestProducts() {
        return productRepository.findTop8ByOrderByRatingDesc();
    }

    private double calculateDiscountRate(Product product) {
        return (product.getPrice() - product.getDiscountPrice()) * 1.0 / product.getPrice();
    }
}
