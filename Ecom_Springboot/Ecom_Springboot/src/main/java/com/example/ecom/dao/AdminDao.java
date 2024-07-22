package com.example.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecom.model.Admin;
public interface AdminDao extends JpaRepository<Admin,Integer>{
	Admin findByEmail(String email);
}
