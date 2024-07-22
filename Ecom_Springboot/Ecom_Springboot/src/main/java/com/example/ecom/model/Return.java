package com.example.ecom.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "returns")
public class Return {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String email;
	private Long orderId;
	private String orderDate;
	private String date;
	private Long productId;
    private String productName;
    private String Price;
    private String address1;
    private String address2;
    private String city;
    private String zip;
    private String landmark;
    private String status=null;
    
    public Return() {
    	
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getOrderdate() {
		return orderDate;
	}

	public void setOrderdate(String orderdate) {
		this.orderDate = orderdate;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
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

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getLandmark() {
		return landmark;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}
	
    public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Return [id=" + id + ", email=" + email + ", orderId=" + orderId + ", orderDate=" + orderDate + ", date=" + date + ",  productName=" + productName + ", productId=" 
	            + productId + ", Price=" + Price + ", address1=" + address1 + ", address2=" + address2 + ", city="+ city + ", zip=" + zip +", landmark=" + landmark +", status=" + status +"]";
	}
}
