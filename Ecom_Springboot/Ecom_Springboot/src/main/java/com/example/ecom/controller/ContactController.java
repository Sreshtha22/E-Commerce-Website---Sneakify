package com.example.ecom.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.ecom.model.Contact;
import com.example.ecom.services.ContactService;
@RestController
@CrossOrigin
public class ContactController {
	@Autowired
	private ContactService contactService;
	@PostMapping("/contact")
	public ResponseEntity<?> addContact(@RequestBody Contact contact) {
	    try {
	    	Contact addedContact = contactService.addContact(contact);
	        return ResponseEntity.ok(addedContact);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid email address");
}
}
	 @GetMapping("/contacts")
	    public ResponseEntity<List<Contact>> getAllContacts() {
	        List<Contact> contacts = contactService.getAllContacts();
	        return ResponseEntity.ok(contacts);
	    }
	 
	 @PutMapping("/updateQueryStatus/{id}")
	 public ResponseEntity<?> updateQueryStatus(@PathVariable("id") int id, @RequestBody Map<String, String> requestBody) {
	     try {
	         String ans = requestBody.get("ans"); 
	         Contact updatedContact = contactService.updateQueryStatus(id, ans);
	         return ResponseEntity.ok(updatedContact);
	     } catch (IllegalArgumentException e) {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contact not found");
	     }
	 }
}