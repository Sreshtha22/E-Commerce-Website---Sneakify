package com.example.ecom.services;

import java.util.List;

import com.example.ecom.model.OrderItem;

public interface OrderItemService {
	public List<OrderItem> getAllOrderItems();
	public OrderItem updateShippingStatus(Long orderId, Long productId, String newStatus);
}
