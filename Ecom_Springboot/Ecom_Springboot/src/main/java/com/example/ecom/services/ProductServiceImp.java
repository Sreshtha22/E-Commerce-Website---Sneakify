package com.example.ecom.services;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecom.dao.ProductDao;
import com.example.ecom.model.Product;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductServiceImp implements ProductService {

	@Autowired
	private ProductDao productDao;
	
	@Override
	public void addProduct (MultipartFile file, String name, String pdesc, String originalPrice, String discountedPrice,
		    String discountPercentage,String category, Map<String, Integer> sizeQuantities) {
		Product p = new Product();
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		if(fileName.contains(".."))
		{
			System.out.println("not a a valid file");
		}
		try {
			p.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		p.setName(name);
		p.setPdesc(pdesc);
		p.setOriginalPrice(originalPrice);
		p.setDiscountedPrice(discountedPrice);
		p.setDiscountPercentage(discountPercentage);
		p.setCategory(category);
		p.setSizeQuantities(sizeQuantities);
		
		productDao.save(p);
	}
	
	 public List<Product> getAllProducts() {
	        return productDao.findAll(); 
	    }
	 
	 @Override
	 public void deleteProduct(Long productId) {
	        productDao.deleteById(productId);
	 }
	 
	 @Override
	 public Product getProduct(Long productId) {
		return productDao.findById(productId).get();
	 }
	 
	 @Override
	    public List<Product> searchProducts(String query) {
	        return productDao.findByNameContainingIgnoreCase(query);
	    }
	 @Override
	 public void updateProductQuantity(Long productId, String size, int quantity) {
	     Product product = productDao.findById(productId)
	             .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
	     Map<String, Integer> sizeQuantities = product.getSizeQuantities();
	     if (sizeQuantities.containsKey(size)) {
	         int currentQuantity = sizeQuantities.get(size);
	         int newQuantity = currentQuantity - quantity;
	         if (newQuantity >= 0) {
	             sizeQuantities.put(size, newQuantity);
	             product.setSizeQuantities(sizeQuantities);
	             productDao.save(product);
	         } else {
	             throw new IllegalArgumentException("Not enough quantity available for the specified size");
	         }
	     } else {
	         throw new IllegalArgumentException("Size not found for product id: " + productId);
	     }
	 }
	 
	 @Override
	 public void updateQuantity(Long productId, String size, int quantity) {
	     Product product = productDao.findById(productId)
	             .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
	     Map<String, Integer> sizeQuantities = product.getSizeQuantities();
	     if (sizeQuantities.containsKey(size)) {
	         int currentQuantity = sizeQuantities.get(size);
	         int newQuantity = currentQuantity + quantity;
	         if (newQuantity >= 0) {
	             sizeQuantities.put(size, newQuantity);
	             product.setSizeQuantities(sizeQuantities);
	             productDao.save(product);
	         } else {
	             throw new IllegalArgumentException("Not enough quantity available for the specified size");
	         }
	     } else {
	         throw new IllegalArgumentException("Size not found for product id: " + productId);
	     }
	 }
}
