package com.example.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecom.dao.OrderDao;
import com.example.ecom.model.Order;
import com.example.ecom.model.OrderItem;

import jakarta.transaction.Transactional;


@Service
public class OrderServiceImp implements OrderService{
	@Autowired
	private OrderDao orderDao;
	@Override
    @Transactional
    public Order saveOrder(Order order) {
        List<OrderItem> orderItems = order.getItems();
        System.out.println("Order Items : " + orderItems);
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }
        return orderDao.save(order);
    }
	@Override
	public List<Order> getAllOrders() {
        return orderDao.findAll();
    }
}
