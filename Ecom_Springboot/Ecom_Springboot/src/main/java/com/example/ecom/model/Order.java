package com.example.ecom.model;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Transactional
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String email;
    private String phno;
    private String name;
    private String address1;
    private String address2;
    private String city;
    private String zip;
    private String landmark;
    private String payment;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", referencedColumnName="id")
    @JsonBackReference
    private List<OrderItem> items= new ArrayList<>();
    
    public Order() {
    }
    
    public Order(Date date, String email, String phno, String name, String address1, String address2, String city,
            String zip, String landmark, String payment, List<OrderItem> items) {
   this.date = date;
   this.email = email;
   this.phno = phno;
   this.name = name;
   this.address1 = address1;
   this.address2 = address2;
   this.city = city;
   this.zip = zip;
   this.landmark = landmark;
   this.payment = payment;
   this.items = items;
}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhno() {
		return phno;
	}

	public void setPhno(String phno) {
		this.phno = phno;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}
    
	@Override
	public String toString() {
		return "Order [id=" + id + ", date=" + date + ", email=" 
	            + email + ", phno=" + phno + ", name=" + name + ", address1=" + address1 +", "
	            		+ "address2="+ address2 +","
	            		+ " city="+ city + ", zip=" + zip + ", landmark=" + landmark + ", payment=" + payment + ", items=" + items +"]";
	}

}
