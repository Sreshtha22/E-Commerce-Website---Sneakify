package com.example.ecom.services;


import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.ecom.model.Product;


public interface ProductService {
    public void addProduct (MultipartFile file, String name, String pdesc, String originalPrice, String discountedPrice,
    String discountPercentage,String category, Map<String, Integer> sizeQuantities);
    List<Product> getAllProducts();
    void deleteProduct(Long productId);
    public Product getProduct(Long productId);
    List<Product> searchProducts(String query);
    public void updateProductQuantity(Long productId,String size,int quantity);
    public void updateQuantity(Long productId,String size,int quantity);
}
