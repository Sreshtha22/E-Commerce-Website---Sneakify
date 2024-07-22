package com.example.ecom.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.ecom.model.Customer;
import com.example.ecom.services.CustomerService;
@RestController
@CrossOrigin
public class CustomerController {
@Autowired
private CustomerService customerService;
@PostMapping("/cust")
public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
    try {
        Customer addedCustomer = customerService.addCustomer(customer);
        return ResponseEntity.ok(addedCustomer);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    }
}
@GetMapping("/cust/{email}")
public Customer signinCheck(@PathVariable("email") String email)
{
	return this.customerService.signin(email);
}
@PostMapping("/forgotpassword")
public ResponseEntity<?> forgotPassword(@RequestParam("email") String email,
                                        @RequestParam("securityQuestion") String securityQuestion,
                                        @RequestParam("answer") String answer,
                                        @RequestParam("newPassword") String newPassword) {
    try {
        Customer customer = customerService.getByEmail(email);
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
        if (!customer.getSqstn().equals(securityQuestion) ||
            !customer.getAns().equals(answer)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid security question or answer");
        }
        customer.setPassword(newPassword);
        customerService.updateCustomer(customer);
        return ResponseEntity.ok("Password updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password");
    }
}

@GetMapping("/customer/{email}")
public ResponseEntity<?> getCustomerByEmail(@PathVariable("email") String email) {
    try {
        Customer customer = customerService.getByEmail(email);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found with email: " + email);
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch customer");
    }
}

@PostMapping("/changepassword")
public ResponseEntity<?> changePassword(@RequestParam("email") String email,
                                        @RequestParam("password") String password,
                                        @RequestParam("newPassword") String newPassword) {
    try {
        Customer customer = customerService.getByEmail(email);
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
        if (!customer.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }
        customer.setPassword(newPassword);
        customerService.updateCustomer(customer);
        return ResponseEntity.ok("Password updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password");
    }
}

@PostMapping("/update")
public ResponseEntity<?> update(@RequestParam("email") String email,
                                        @RequestParam("name") String name,
                                        @RequestParam("phno") String phno) {
    try {
        Customer customer = customerService.getByEmail(email);
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
        customer.setName(name);
        customer.setPhno(phno);
        customerService.updateCustomer(customer);
        return ResponseEntity.ok("Password updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password");
    }
}
}