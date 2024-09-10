package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.ProductDTO.ProductRequestDTO;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.services.ProductService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Validated
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(){
        try{
            List<Product> productList = productService.getAllProducts();
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        try{
            Product product = productService.getProductById(productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/products/best")
    public ResponseEntity<?> getBestProducts() {
        try {
            List<Product> product = productService.getBestProducts();
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/products/sale")
    public ResponseEntity<?> getSaleProducts() {
        try{
            List<Product> product = productService.getSaleProducts();
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/products/newest")
    public ResponseEntity<?> getNewestProducts() {
        try {
            List<Product> product = productService.getNewestProducts();
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("products/search")
    public ResponseEntity<?> searchProduct(@RequestParam String productName) {
        try{
            List<Product> productList = productService.searchProduct(productName);
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(path = "/api/admin/products", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Transactional
    public ResponseEntity<?> createProduct(@ModelAttribute @Valid ProductRequestDTO productRequestDTO) throws Exception {
            Product product = productService.createProduct(productRequestDTO);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
    }
    @PutMapping("/api/admin/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductRequestDTO productRequestDTO){
        try{
            Product product = productService.updateProduct(productId, productRequestDTO);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/api/admin/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId){
        try{
            Product product = productService.deleteProduct(productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
