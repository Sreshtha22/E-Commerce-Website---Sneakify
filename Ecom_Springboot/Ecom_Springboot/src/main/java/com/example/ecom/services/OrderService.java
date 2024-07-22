package com.example.ecom.services;



import java.util.List;

import com.example.ecom.model.Order;

public interface OrderService {
	 public Order saveOrder(Order order);
	 public List<Order> getAllOrders(); 
}
