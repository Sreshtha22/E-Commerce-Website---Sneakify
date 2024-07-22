package com.example.ecom.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecom.model.Order;
import com.example.ecom.model.OrderItem;
import com.example.ecom.services.EmailSenderService;
import com.example.ecom.services.OrderService;
import com.razorpay.RazorpayClient;

@RestController
@CrossOrigin
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
    private EmailSenderService emailSenderService;
	@PostMapping("/checkout")
	public ResponseEntity<String> createOrder(@RequestBody Order order) {
	    try {
	        System.out.println("Received Order object: " + order.toString());
	        String customerEmail = order.getEmail();
	        
	        if (order.getPayment().equalsIgnoreCase("COD")) {
	            orderService.saveOrder(order);
	            
	            String subject = "Order Confirmation";
	            String body = "Thank you for your order. Track your orders from the order page of the website.";
	            emailSenderService.sendSimpleEmail(customerEmail, subject, body);
	            
	            return new ResponseEntity<>("COD Order created and email sent to " + customerEmail, HttpStatus.CREATED);
	        } else {
	            RazorpayClient razorpay = new RazorpayClient("rzp_test_47XQ9y61FqkFKN", "Uj7JJoLcTKqJTiaVqer1vZMg");
	            
	            double totalAmount = 0.0;
	            for (OrderItem item : order.getItems()) {
	                totalAmount += Double.parseDouble(item.getPrice());
	            }

	            JSONObject orderRequest = new JSONObject();
	            orderRequest.put("amount", totalAmount); 
	            orderRequest.put("currency", "INR");
	            orderRequest.put("receipt", "order_" + order.getId());
	            orderRequest.put("payment_capture", 1); 

	            com.razorpay.Order response = razorpay.orders.create(orderRequest);
	            System.out.println(response);
	         
	            String subject = "Order Confirmation";
	            String body = "Thank you for your order. Track your orders from the order page of the website. ";
	            emailSenderService.sendSimpleEmail(customerEmail, subject, body);
	            
	            orderService.saveOrder(order);

	            return new ResponseEntity<>("Order created and email sent to " + customerEmail, HttpStatus.CREATED);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Error creating order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	 @GetMapping("/orders")
	 public ResponseEntity<List<Order>> getAllOrders() {
	     List<Order> orders = orderService.getAllOrders();
	     return new ResponseEntity<>(orders, HttpStatus.OK);
	 }
}
