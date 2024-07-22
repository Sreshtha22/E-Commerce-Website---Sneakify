package com.example.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecom.model.Cart;

public interface CartDao extends JpaRepository<Cart, Long>{
	boolean existsByProductIdAndSizeAndEmail(Long productId, String size, String email);
	List<Cart> findByEmail(String email);
	 Cart findByEmailAndProductIdAndSize(String email, Long productId, String size);
	 void deleteAllByEmail(String email);
}