package com.example.ecom.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
@Entity
public class Cart {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	private Long productId;
	private String email;
    private String productName;
    private String Price;
    private String size;
    private int quantity;
    @Lob
	@Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;
    
    public Cart() {
    	
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getPrice() {
		return Price;
	}

	public void setPrice(String price) {
		Price = price;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
    
	public String toString() {
		return "Cart [id=" + id + ", email=" + email + ", productName=" + productName + ", productId=" 
	            + productId + ", Price=" + Price + ", size=" + size + ", quantity=" + quantity +",  image="+ image +  "]";
	}
}
