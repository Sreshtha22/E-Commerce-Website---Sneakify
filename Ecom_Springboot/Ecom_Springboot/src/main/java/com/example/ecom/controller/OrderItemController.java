package com.example.ecom.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecom.model.OrderItem;
import com.example.ecom.services.OrderItemService;

@RestController
@CrossOrigin
public class OrderItemController {
	@Autowired
	private OrderItemService orderItemService;
	
	@GetMapping("/order_items")
	public ResponseEntity<List<OrderItem>> getAllOrderItems() {
	    List<OrderItem> orderItems = orderItemService.getAllOrderItems();
	    return new ResponseEntity<>(orderItems, HttpStatus.OK);
	}
	
	@PutMapping("/order_item/{orderId}/{productId}")
    public ResponseEntity<String> updateShippingStatus(
            @PathVariable("orderId") Long orderId,
            @PathVariable("productId") Long productId,
            @RequestBody Map<String, String> requestBody) {
		String status = requestBody.get("shippingStatus");
		orderItemService.updateShippingStatus(orderId, productId, status);
	    return new ResponseEntity<>(status, HttpStatus.OK);
    }
}
