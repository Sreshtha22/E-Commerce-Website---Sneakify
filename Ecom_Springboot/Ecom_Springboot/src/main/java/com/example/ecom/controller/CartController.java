package com.example.ecom.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecom.model.Cart;
import com.example.ecom.services.CartService;

@RestController
@CrossOrigin
public class CartController {
	
	 @Autowired
	 private CartService cartService;
	 
	 @PostMapping("/cart")
	    public ResponseEntity<String> saveCart(@RequestParam("productImage") byte[] imageData,
	                                            @RequestParam("email") String email,
	                                            @RequestParam("productId") Long productId,
	                                            @RequestParam("productName") String productName,
	                                            @RequestParam("productPrice") String productPrice,
	                                            @RequestParam("quantity") int quantity,
	                                            @RequestParam("size") String size) {

	        try {
	            cartService.addToCart(imageData, productId, email, productName, productPrice, size, quantity);

	            return ResponseEntity.ok("Product saved successfully");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save product to cart");
	        }
	    }
	 
	 @GetMapping("/cart/check/{productId}/{size}/{email}")
	    public ResponseEntity<Integer> checkSizeInCart(@PathVariable("productId") Long productId, @PathVariable("size") String size, @PathVariable("email") String email) {
	        boolean exists = cartService.isSizeInCart(productId, size, email);
	        int existsAsInt = exists ? 1 : 0;
	        return ResponseEntity.ok().body(existsAsInt);
	    }
	 
	 @GetMapping("/cart/{email}")
	    public ResponseEntity<List<Cart>> getCart(@PathVariable("email") String email)
	    {
		 List<Cart> cartResults = cartService.getCart(email);
	        return ResponseEntity.ok(cartResults);
	    }
	 
	 @PutMapping("/cart/update")
	    public ResponseEntity<?> updateCart(@RequestBody List<Cart> cartItems) {
	        try {
	            cartService.updateCart(cartItems);
	            return ResponseEntity.ok().build();
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update cart");
	        }
	    }
	 @DeleteMapping("/cart/{email}/{productId}/{size}")
	    public ResponseEntity<?> removeFromCart(@PathVariable("email") String email, @PathVariable("productId") Long productId, @PathVariable("size") String size) {
	        try {
	            cartService.removeFromCart(email, productId, size);
	            return ResponseEntity.ok().build();
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove product from cart. " + e.getMessage());
	        }
	    }
	 @DeleteMapping("/cart/{email}")
	 public ResponseEntity<?> removeCart(@PathVariable("email") String email) {
	     try {
	         cartService.removeCart(email);
	         return ResponseEntity.ok().build();
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove cart items. " + e.getMessage());
	     }
	 }
	}