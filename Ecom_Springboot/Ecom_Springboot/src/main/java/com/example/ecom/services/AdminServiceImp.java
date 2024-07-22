package com.example.ecom.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecom.dao.AdminDao;
import com.example.ecom.model.Admin;

@Service
public class AdminServiceImp implements AdminService{
	
	@Autowired
	private AdminDao adminDao;
	@Override
	public Admin signin(String Email) {
		return adminDao.findByEmail(Email);
	}
	@Override
	public void addHardcodedAdmin() {
        Admin existingAdmin = adminDao.findByEmail("sneakify05@gmail.com");
        if (existingAdmin == null) {
            Admin admin = new Admin();
            admin.setEmail("sneakify05@gmail.com");
            admin.setPassword("#Sneakify@5");
            adminDao.save(admin);
        }
    }
}
