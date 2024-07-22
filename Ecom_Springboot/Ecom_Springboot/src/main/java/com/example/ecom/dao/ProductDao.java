package com.example.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecom.model.Product;

public interface ProductDao extends JpaRepository<Product, Long> {
	void deleteById(Long id);
	List<Product> findByNameContainingIgnoreCase(String name);
}
