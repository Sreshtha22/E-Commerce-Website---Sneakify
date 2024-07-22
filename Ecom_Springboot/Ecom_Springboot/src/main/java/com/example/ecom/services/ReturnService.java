package com.example.ecom.services;

import java.util.List;

import com.example.ecom.model.Return;

public interface ReturnService {
	public void saveReturn (String email, Long orderId, String orderDate, String date, Long productId, String productName, String Price, String address1, String address2, String city, String zip, String landmark);
	 public Return fetchReturnOrderStatus(Long orderId, Long productId);
	 public List<Return> getAllReturnItems();
	 public Return updateReturnStatus(Long orderId, Long id, String newStatus);
}
