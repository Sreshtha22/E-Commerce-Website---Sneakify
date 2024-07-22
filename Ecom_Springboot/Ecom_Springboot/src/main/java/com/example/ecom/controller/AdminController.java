package com.example.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecom.model.Admin;
import com.example.ecom.services.AdminService;

import jakarta.annotation.PostConstruct;


@RestController
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/admin/{email}")
	public Admin signinCheck(@PathVariable("email") String email)
	{
		return this.adminService.signin(email);
	}
	
	@PostConstruct 
    public void init() {
        this.adminService.addHardcodedAdmin(); 
    }
}
