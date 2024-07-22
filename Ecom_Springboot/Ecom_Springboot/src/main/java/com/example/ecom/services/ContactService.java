package com.example.ecom.services;
import java.util.List;

import com.example.ecom.model.Contact;
public interface ContactService {
	public Contact addContact(Contact contact);
	List<Contact> getAllContacts();
	Contact updateQueryStatus(int id, String ans);
}