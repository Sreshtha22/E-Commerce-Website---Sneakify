package com.example.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecom.model.Return;

public interface ReturnDao extends JpaRepository<Return, Long>{
	 Return findByOrderIdAndProductId(Long orderId, Long productId);
	 Return findByOrderIdAndId(Long orderId, Long Id);
}
