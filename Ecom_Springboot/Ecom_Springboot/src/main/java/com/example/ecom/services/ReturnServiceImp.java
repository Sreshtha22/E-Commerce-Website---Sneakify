package com.example.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecom.dao.ReturnDao;
import com.example.ecom.model.Return;

@Service
public class ReturnServiceImp implements ReturnService{
	@Autowired
	private ReturnDao returnDao;
	
	@Override
	public void saveReturn (String email, Long orderId, String orderDate, String date, Long productId, String productName, String Price, String address1, String address2, String city, String zip, String landmark) {
		Return returns = new Return();
        returns.setEmail(email);
        returns.setOrderId(orderId);
        returns.setOrderdate(orderDate);
        returns.setDate(date);
        returns.setProductId(productId);
        returns.setProductName(productName);
        returns.setPrice(Price);
        returns.setAddress1(address1);
        returns.setAddress2(address2);
        returns.setCity(city);
        returns.setZip(zip);
        returns.setLandmark(landmark);

        returnDao.save(returns);
    }
	@Override
	public Return fetchReturnOrderStatus(Long orderId, Long productId) {
	    Return returnOrder = returnDao.findByOrderIdAndProductId(orderId, productId);

	    if (returnOrder != null) {
	        return returnOrder;
	    } else {
	        return null;
	    }
	}
	
	@Override
    public List<Return> getAllReturnItems() {
        return returnDao.findAll();
    }
	
	@Override
    public Return updateReturnStatus(Long orderId, Long id, String newStatus) {
        Return returnItem = returnDao.findByOrderIdAndId(orderId, id);
        if (returnItem != null) {
        	returnItem.setStatus(newStatus);
            return returnDao.save(returnItem);
        } else {
            throw new IllegalArgumentException("Return item not found for orderId: " + orderId + " and Id: " + id);
        }
    }

}
