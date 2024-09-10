package com.IT4409.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "category_products")
@Data
public class CategoryProduct {
    @EmbeddedId
    private CategoryProductKey id;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
}
