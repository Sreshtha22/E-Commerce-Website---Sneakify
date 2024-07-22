package com.example.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecom.dao.OrderItemDao;
import com.example.ecom.model.OrderItem;

@Service
public class OrderItemServiceImp implements OrderItemService{
	@Autowired
    private OrderItemDao orderItemDao;
    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemDao.findAll();
    }
    @Override
    public OrderItem updateShippingStatus(Long orderId, Long productId, String newStatus) {
        OrderItem orderItem = orderItemDao.findByOrderIdAndProductId(orderId, productId);
        if (orderItem != null) {
            orderItem.setShippingStatus(newStatus);
            return orderItemDao.save(orderItem);
        } else {
            throw new IllegalArgumentException("Order item not found for orderId: " + orderId + " and productId: " + productId);
        }
    }
}
