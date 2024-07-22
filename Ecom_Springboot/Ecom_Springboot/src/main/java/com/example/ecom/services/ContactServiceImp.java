package com.example.ecom.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ecom.dao.ContactDao;
import com.example.ecom.model.Contact;
@Service
public class ContactServiceImp implements ContactService{
	@Autowired
	private ContactDao contactDao;
	public Contact addContact(Contact contact) {
		if (contactDao.findById(contact.getId()) != null) {
            throw new IllegalArgumentException("Invalid email address");
        }
		contactDao.save(contact);
		return contact;
	}
	
	public List<Contact> getAllContacts() {
        return contactDao.findAll(); 
    }
	
	@Override
    public Contact updateQueryStatus(int id, String ans) {
        Contact contact = contactDao.findById(id);
        if (contact != null) {
            contact.setAns(ans);
            contactDao.save(contact);
            return contact;
        } else {
            throw new IllegalArgumentException("Contact not found");
        }
    }
}