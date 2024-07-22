package com.example.ecom.services;

import java.util.List;

import com.example.ecom.model.Cart;

public interface CartService {
	public void addToCart (byte[] imageBytes, Long productId, String email, String productName, String Price, String size, int quantity);
	public boolean isSizeInCart(Long productId, String size,String email);
	List<Cart> getCart(String email);
	public void updateCart(List<Cart> cartItems);
	public void removeFromCart(String email, Long productId, String size);
	 public void removeCart(String email);
}
