package com.example.ecom.services;
import com.example.ecom.model.Customer;
public interface CustomerService {
	public Customer addCustomer(Customer customer);
	public Customer signin(String Email);
	 Customer getByEmail(String email); 
	 Customer updateCustomer(Customer customer);
}