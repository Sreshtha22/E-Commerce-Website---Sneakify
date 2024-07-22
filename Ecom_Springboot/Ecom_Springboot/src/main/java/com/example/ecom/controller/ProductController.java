package com.example.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecom.model.Product;
import com.example.ecom.services.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/product")
    public ResponseEntity<String> saveProduct(@RequestParam("image") MultipartFile file,
                                              @RequestParam("name") String name,
                                              @RequestParam("pdesc") String pdesc,
                                              @RequestParam("originalPrice") String originalPrice,
                                              @RequestParam("discountedPrice") String discountedPrice,
                                              @RequestParam("discountPercentage") String discountPercentage,
                                              @RequestParam("category") String category,
                                              @RequestParam("sizeQuantities") String sizeQuantitiesJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Integer> sizeQuantities;
        try {
        	sizeQuantities = objectMapper.readValue(sizeQuantitiesJson, new TypeReference<Map<String, Integer>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid sizeQuantities JSON format");
        }

        productService.addProduct(file, name, pdesc, originalPrice, discountedPrice, discountPercentage, category, sizeQuantities);
        return ResponseEntity.ok("Product saved successfully");
    }
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @DeleteMapping("/product/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product");
        }
    }
    
    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId)
    {
    	return this.productService.getProduct(productId);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query) {
        List<Product> searchResults = productService.searchProducts(query);
        return ResponseEntity.ok(searchResults);
    }
    @PutMapping("/product/{productId}")
    public ResponseEntity<String> updateProductQuantity(@PathVariable("productId") Long productId, 
    		@RequestBody Map<String, String> requestBody) {
        try {
        	String size = requestBody.get("size");
        	int quantity = Integer.parseInt(requestBody.get("quantity")); 
        	 System.out.println("Received productId: " + productId);
             System.out.println("Received quantity: " + quantity);
             System.out.println("Received size: " + size);
            productService.updateProductQuantity(productId, size, quantity);
            return ResponseEntity.ok("Product quantity updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product quantity");
        }
    }
    
    @PutMapping("/products/{productId}")
    public ResponseEntity<String> updateQuantity(@PathVariable("productId") Long productId, 
    		@RequestBody Map<String, String> requestBody) {
        try {
        	String size = requestBody.get("size");
        	int quantity = Integer.parseInt(requestBody.get("quantity")); 
        	 System.out.println("Received productId: " + productId);
             System.out.println("Received quantity: " + quantity);
             System.out.println("Received size: " + size);
            productService.updateQuantity(productId, size, quantity);
            return ResponseEntity.ok("Product quantity updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product quantity");
        }
    }
}
