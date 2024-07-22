package com.example.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ecom.model.OrderItem;

public interface OrderItemDao extends JpaRepository<OrderItem,Long>{
    OrderItem findByOrderIdAndProductId(Long orderId, Long productId);

}
