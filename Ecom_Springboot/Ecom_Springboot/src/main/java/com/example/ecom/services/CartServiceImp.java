package com.example.ecom.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ecom.dao.CartDao;
import com.example.ecom.model.Cart;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImp implements CartService{
	@Autowired
	private CartDao cartDao;
	@Override
	public void addToCart(byte[] imageBytes, Long productId, String email, String productName, String price, String size, int quantity) {

	        Cart cart = new Cart();
	        cart.setImage(imageBytes);
	        cart.setProductId(productId);
	        cart.setEmail(email);
	        cart.setProductName(productName);
	        cart.setPrice(price);
	        cart.setSize(size);
	        cart.setQuantity(quantity);

	        cartDao.save(cart);
	    }
	@Override
	public boolean isSizeInCart(Long productId, String size, String email) {
        return cartDao.existsByProductIdAndSizeAndEmail(productId, size, email);
    }
	
	@Override
	public List<Cart> getCart(String email) {
	    return cartDao.findByEmail(email);
	}
	@Override
	public void updateCart(List<Cart> cartItems) {
        for (Cart cartItem : cartItems) {
            cartDao.save(cartItem);
        }
	}
        @Override
        public void removeFromCart(String email, Long productId, String size) {
            Cart cartItem = cartDao.findByEmailAndProductIdAndSize(email, productId, size);
            if (cartItem != null) {
                cartDao.delete(cartItem);
            } 
}
        @Override
        @Transactional
        public void removeCart(String email) {
        	if (email != null) {
                cartDao.deleteAllByEmail(email);
            } else {
                throw new IllegalArgumentException("Email cannot be null");
            }
        }
	}
