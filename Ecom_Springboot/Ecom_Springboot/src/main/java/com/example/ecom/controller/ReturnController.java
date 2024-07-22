package com.example.ecom.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecom.model.Return;
import com.example.ecom.services.ReturnService;

@RestController
@CrossOrigin
public class ReturnController {
	@Autowired
	 private ReturnService returnService;
	
	@PostMapping("/return")
    public ResponseEntity<String> saveReturn(@RequestParam("email") String email,
    										 @RequestParam("orderId") Long orderId,
    										 @RequestParam("orderDate") String orderDate,
    										 @RequestParam("currentDate") String currentDate,
                                            @RequestParam("productId") Long productId,
                                            @RequestParam("productName") String productName,
                                            @RequestParam("productPrice") String productPrice,
                                            @RequestParam("address1") String address1,
                                            @RequestParam("address2") String address2,
                                            @RequestParam("city") String city,
                                            @RequestParam("zip") String zip,
                                            @RequestParam("landmark") String landmark) {

        try {
            returnService.saveReturn(email, orderId, orderDate, currentDate, productId, productName, productPrice, address1, address2, city, zip, landmark);

            return ResponseEntity.ok("Return saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save return");
        }
    }
	
	 @GetMapping("/return")
		public ResponseEntity<List<Return>> getAllReturnItems() {
		    List<Return> returnItems = returnService.getAllReturnItems();
		    return new ResponseEntity<>(returnItems, HttpStatus.OK);
		}
	
	 @GetMapping("/return/{orderId}/{productId}")
	 public ResponseEntity<Return> fetchReturnOrderStatus(@PathVariable("orderId") Long orderId, @PathVariable("productId") Long productId) {
	     try {
	         Return returnStatus = returnService.fetchReturnOrderStatus(orderId, productId);
	         if (returnStatus != null) {
	             return ResponseEntity.ok(returnStatus);
	         } else {
	             return null;
	         }
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	     }
	 }
	 
	 @PutMapping("/return/{orderId}/{id}")
	    public ResponseEntity<String> updateShippingStatus(
	            @PathVariable("orderId") Long orderId,
	            @PathVariable("id") Long id,
	            @RequestBody Map<String, String> requestBody) {
			String status = requestBody.get("Status");
			returnService.updateReturnStatus(orderId, id, status);
		    return new ResponseEntity<>(status, HttpStatus.OK);
	    }
}
