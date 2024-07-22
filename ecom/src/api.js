import axios from "axios";
const userUrl = 'http://localhost:8090';

export const signupCust = async (cust) => {
    try {
        const response = await axios.post(`${userUrl}/cust`, cust);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.log('Error while calling signupCust Api ', error.message);
            throw new Error('Email already exists');
        }
        else {
            console.log('Error while calling signupCust Api ', error.message);
            throw new Error('Failed to Sign Up. Please try again later.');
        }
    }
}

export const getSignin = async (email) => {
    email = email || '';
    try {
        const response = await axios.get(`${userUrl}/cust/${email}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getCust API:', error.message);
        throw error;
    }
}

export const forgotPassword = async (email, securityQuestion, answer, newPassword) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('securityQuestion', securityQuestion);
        formData.append('answer', answer);
        formData.append('newPassword', newPassword);
        const response = await axios.post(`${userUrl}/forgotpassword`, formData);
        return response.data;
    } catch (error) {
        console.error('Error while calling forgotPassword API:', error.message);
        throw error;
    }
};

export const getCustomerData = async (email) => {
    try {
        const response = await axios.get(`${userUrl}/customer/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error while calling getCustomerByEmail API:', error.message);
        throw error;
    }
}

export const getAdminSignin = async (email) => {
    email = email || '';
    try {
        const response = await axios.get(`${userUrl}/admin/${email}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getCust API:', error.message);
        throw error;
    }
}

export const contactUs = async (contact) => {
    try {
        const response = await axios.post(`${userUrl}/contact`, contact);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.log('Error while calling contactUs Api ', error.message);
            throw new Error('Invalid email address');
        } else {
            console.log('Error while calling contactUs Api ', error.message);
            throw new Error('Failed to send message. Please try again later.');
        }
    }
}

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${userUrl}/product`, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while calling addProduct API ', error.message);
        throw new Error('Failed to add product. Please try again later.');
    }
}

export const fetchContacts = async () => {
    try {
        const response = await fetch(`${userUrl}/contacts`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const updateQueryStatus = async (queryId, newStatus) => {
    try {
        const response = await fetch(`${userUrl}/updateQueryStatus/${queryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ans: newStatus })
        });
        if (!response.ok) {
            throw new Error('Failed to update query status');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating query status:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${userUrl}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getProduct = async (productId) => {
    try {
        productId = productId || '';
        const response = await axios.get(`${userUrl}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getProduct API:', error.message);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${userUrl}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error while calling deleteProduct API ', error.message);
        throw new Error('Failed to delete product. Please try again later.');
    }
}

export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${userUrl}/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw new Error('Failed to search products. Please try again later.');
    }
};

export const addToCart = async (email, productImageFile, productId, productName, productPrice, quantity, size) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('productImage', productImageFile);
        formData.append('productId', productId);
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('quantity', quantity);
        formData.append('size', size);

        const response = await axios.post(`${userUrl}/cart`, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw new Error('Failed to add product to cart. Please try again later.');
    }
};

export const isSizeInCart = async (productId, size, email) => {
    try {
        const response = await axios.get(`${userUrl}/cart/check/${productId}/${size}/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error checking size in cart:', error);
        throw new Error('Failed to check if size is in cart. Please try again later.');
    }
};

export const getCart = async (email) => {
    try {
        email = email || '';
        const response = await axios.get(`${userUrl}/cart/${email}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error while calling getCart API:', error.message);
        throw error;
    }
}

export const updateCart = async (cartItems) => {
    try {
        const response = await axios.put(`${userUrl}/cart/update`, cartItems);
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw new Error('Failed to update cart. Please try again later.');
    }
};

export const removeFromCart = async (email, productId, size) => {
    try {
        const response = await axios.delete(`${userUrl}/cart/${email}/${productId}/${size}`);
        return response.data;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw new Error('Failed to remove product from cart. Please try again later.');
    }
};

export const checkOut = async (orderData) => {
    try {
        const response = await axios.post(`${userUrl}/checkout`, orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.log('Error while calling checkOut Api ', error.message);
            throw new Error('Failed to Order Place. Please try again.');
        }
        else {
            console.log('Error while calling checkOut Api ', error.message);
            throw new Error('Failed to Order Place. Please try again later.');
        }
    }
}

export const updateProductQuantity = async (productId, size, updatedQuantity) => {
    try {
        console.log("productId: ", productId);
        console.log("quantity: ", updatedQuantity);
        console.log("size:  ", size);
        const response = await axios.put(`${userUrl}/product/${productId}`, { "size": size, "quantity": updatedQuantity });
        return response.data;
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw new Error('Failed to update product quantity. Please try again later.');
    }
};

export const removeCart = async (email) => {
    try {
        const response = await axios.delete(`${userUrl}/cart/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error removing cart items:', error);
        throw new Error('Failed to remove cart items. Please try again later.');
    }
};

export const fetchOrdersData = async () => {
    try {
        const response = await axios.get(`${userUrl}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders data: ', error);
        throw error;
    }
};

export const fetchOrderItemsData = async () => {
    try {
        const response = await axios.get(`${userUrl}/order_items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order items data: ', error);
        throw error;
    }
};

export const updateOrderShippingStatus = async (orderId,productId, newStatus) => {
    try {
        console.log("OrderId:", orderId);
        console.log("ProductId:", productId);
        console.log("New Status : ", newStatus);
        const response = await axios.put(`${userUrl}/order_item/${orderId}/${productId}`,{ shippingStatus: newStatus },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
        return response.data;
    } catch (error) {
        console.error('Error updating order shipping status: ', error);
        throw error;
    }
};

export const saveReturnOrder = async (email, orderId, orderDate, currentDate, productId, productName, productPrice, address1, address2, city, zip, landmark) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('orderId', orderId);
        formData.append('orderDate', orderDate);
        formData.append('currentDate', currentDate);
        formData.append('productId', productId);
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('address1', address1);
        formData.append('address2', address2);
        formData.append('city', city);
        formData.append('zip', zip);
        formData.append('landmark', landmark);
        console.log("Form Data : ", formData);
        const response = await axios.post(`${userUrl}/return`, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw new Error('Failed to add product to cart. Please try again later.');
    }
};

export const fetchReturnOrderStatus = async (orderId, productId) => {
    try {
        const response = await axios.get(`${userUrl}/return/${orderId}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching return order status:', error);
        throw error;
    }
};

export const fetchReturnData = async () => {
    try {
        const response = await axios.get(`${userUrl}/return`);
        return response.data;
    } catch (error) {
        console.error('Error fetching return items data: ', error);
        throw error;
    }
};

export const updateReturnStatus = async (orderId,returnId, newStatus) => {
    try {
        console.log("OrderId:", orderId);
        console.log("Return Id:", returnId);
        console.log("New Status : ", newStatus);
        const response = await axios.put(`${userUrl}/return/${orderId}/${returnId}`,{ Status: newStatus },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
        return response.data;
    } catch (error) {
        console.error('Error updating order shipping status: ', error);
        throw error;
    }
};

export const changePassword = async (email, password, newPassword) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('newPassword', newPassword);
        console.log("Form Data : ", formData);
        const response = await axios.post(`${userUrl}/changepassword`, formData);
        return response.data;
    } catch (error) {
        console.error('Error while calling changePassword API:', error.message);
        throw error;
    }
};

export const update = async (email, name, phno) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('phno', phno);
        console.log("Form Data : ", formData);
        const response = await axios.post(`${userUrl}/update`, formData);
        return response.data;
    } catch (error) {
        console.error('Error while calling update API:', error.message);
        throw error;
    }
};

export const updateQuantity = async (productId, size, updatedQuantity) => {
    try {
        console.log("productId: ", productId);
        console.log("quantity: ", updatedQuantity);
        console.log("size:  ", size);
        const response = await axios.put(`${userUrl}/products/${productId}`, { "size": size, "quantity": updatedQuantity });
        return response.data;
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw new Error('Failed to update product quantity. Please try again later.');
    }
};