package com.example.ecom.services;

import com.example.ecom.model.Admin;

public interface AdminService {
	public Admin signin(String Email);
	public void addHardcodedAdmin();
}
