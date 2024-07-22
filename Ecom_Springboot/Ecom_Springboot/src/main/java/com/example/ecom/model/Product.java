package com.example.ecom.model;



import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;

import java.util.Map;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @Column(length = 2000)
    private String pdesc;
    private String originalPrice;
    private String discountedPrice;
    private String discountPercentage;
    private String category;
    @Lob
	@Column(columnDefinition = "MEDIUMBLOB")
    private String image;
    @ElementCollection
    @CollectionTable(name = "product_size_quantity", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "size")
    @Column(name = "quantity")
    private Map<String, Integer> sizeQuantities;
    
    public Product() {
    	
    }
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPdesc() {
		return pdesc;
	}
	public void setPdesc(String pdesc) {
		this.pdesc = pdesc;
	}
	public String getOriginalPrice() {
		return originalPrice;
	}
	public void setOriginalPrice(String originalPrice) {
		this.originalPrice = originalPrice;
	}
	public String getDiscountedPrice() {
		return discountedPrice;
	}
	public void setDiscountedPrice(String discountedPrice) {
		this.discountedPrice = discountedPrice;
	}
	public String getDiscountPercentage() {
		return discountPercentage;
	}
	public void setDiscountPercentage(String discountPercentage) {
		this.discountPercentage = discountPercentage;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Map<String, Integer> getSizeQuantities() {
		return sizeQuantities;
	}
	public void setSizeQuantities(Map<String, Integer> sizeQuantities) {
		this.sizeQuantities = sizeQuantities;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", pdesc=" 
	            + pdesc + ", originalPrice=" + originalPrice + ", discountedPrice=" + discountedPrice + ", discountPercentage=" + discountPercentage +", "
	            		+ "category="+ category +","
	            		+ " image="+ image + ", sizeQuantities=" + sizeQuantities + "]";
	}

    
}
