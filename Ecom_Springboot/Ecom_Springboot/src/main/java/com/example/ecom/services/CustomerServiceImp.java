package com.example.ecom.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ecom.dao.CustomerDao;
import com.example.ecom.model.Customer;
@Service
public class CustomerServiceImp implements CustomerService{
	@Autowired
	private CustomerDao customerDao;
	@Override
	public Customer addCustomer(Customer customer) {
		if (customerDao.findByEmail(customer.getEmail()) != null) {
            throw new IllegalArgumentException("Email already exists");
        }
		customerDao.save(customer);
		return customer;
	}
	@Override
	public Customer signin(String Email) {
		return customerDao.findByEmail(Email);
	}
	@Override
    public Customer getByEmail(String email) {
        return customerDao.findByEmail(email);
    }
    @Override
    public Customer updateCustomer(Customer customer) {
        return customerDao.save(customer);
    }
}