package com.example.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ecom.model.Order;


public interface OrderDao extends JpaRepository<Order,Long>{
	 @Override
	    <S extends Order> List<S> saveAll(Iterable<S> entities);
}
