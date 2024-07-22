import React, { lazy, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { addProduct } from "../../api.js";
const Breadcrumb = lazy(() => import("../../components/Breadcrumb4"));
const initialValues = {
    name: '',
    pdesc: '',
    originalPrice: '',
    discountedPrice: '',
    discountPercentage: '',
    category: '',
    image: '',
    sizes: [],
    stocks: {},
};
const handleLogout = () => {
    localStorage.removeItem("value");
  };
const AddProduct = () => {
    const [product, setProduct] = useState(initialValues);
    const [isError, setIsError] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const formRef = useRef(null);
    const onValueChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setProduct({ ...product, sizes: [...product.sizes, value], stocks: { ...product.stocks, [value]: '' } });
        } else {
            const filteredSizes = product.sizes.filter((size) => size !== value);
            const { [value]: _, ...updatedStocks } = product.stocks;
            setProduct({ ...product, sizes: filteredSizes, stocks: updatedStocks });
        }
    };
    const handleStockChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, stocks: { ...product.stocks, [name]: value } });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', e.target.elements.image.files[0]);
            formData.append('name', product.name);
            formData.append('pdesc', product.pdesc);
            formData.append('originalPrice', product.originalPrice);
            formData.append('discountedPrice', product.discountedPrice);
            formData.append('discountPercentage', product.discountPercentage);
            formData.append('category', product.category);
            product.sizes.forEach(size => {
                formData.append(`sizes[]`, size);
                formData.append(`stocks[${size}]`, product.stocks[size]);
            });
            formData.append('sizeQuantities', JSON.stringify(product.stocks));
            try{
                await addProduct(formData);
                setIsAdded(true);
                setIsError(false);
                setTimeout(() => {
                    setIsAdded(false);
                    console.log('Resetting form');
                    setProduct(initialValues);
                    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    const fileInput = document.getElementById('logo');
                    fileInput.value = '';
                }, 2000);
            }catch{
                setIsAdded(false);
                setIsError(true);
                setTimeout(() => {
                    setIsAdded(false);
                    setIsError(false);
                    console.log('Resetting form');
                    setProduct(initialValues);
                    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    const fileInput = document.getElementById('logo');
                    fileInput.value = ''; 
                }, 2000);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    return (
        <div>
            <div className="bg-secondary border-top p-3 p-md-5 text-white mb-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <Link to="/">
                                <img alt="logo" src="../../images/(0).png" style={{ height: "44px", width: "159px" }} />
                            </Link>
                        </div>
                        <div className="col-md-6 text-center">
                            <h1 className="display-6">Add Product</h1>
                        </div>
                        <div className="col-md-3 text-end">
                            <Link to="/account/signinadmin" className="text-white" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                                <button className='btn btn-dark' onClick={handleLogout}>Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "-16px", display: "flex" }}><Breadcrumb /><span style={{ marginTop: "9px", marginLeft: "-10px" }}>/ Add Products</span></div>
            <div className="container">
                <div className="row align-items-center mb-5">
                </div>
                <div className="row mb-5" style={{ marginTop: '-15px' }}>
                    <div className="col-lg-12">
                        <form ref={formRef} onSubmit={handleSubmit} className="p-4 p-md-4 border rounded" encType="multipart/form-data">
                            <h3 className="text-black mb-5 border-bottom pb-4">Product Details</h3>
                            <div className="form-group" style={{ marginTop: '-30px' }}>
                                <label htmlFor="name" style={{ marginBottom: '6px' }}>Product Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={(e) => onValueChange(e)} placeholder="Write name of the product" required />
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label htmlFor="product-description" style={{ marginBottom: '6px' }}>Product Description</label>
                                <textarea name="pdesc" id="pdesc" cols="30" rows="10" className="form-control" value={product.pdesc} onChange={(e) => onValueChange(e)} placeholder="Write the product description here..." required></textarea>
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label htmlFor="original-price" style={{ marginBottom: '6px' }}>Original Price</label>
                                <input type="text" className="form-control" id="original-price" name="originalPrice" placeholder='Write the original price of the product' value={product.originalPrice} onChange={(e) => onValueChange(e)} required />
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label htmlFor="discounted-price" style={{ marginBottom: '6px' }}>Discounted Price</label>
                                <input type="text" className="form-control" id="discounted-price" name="discountedPrice" placeholder='Write the price of the product after discount' value={product.discountedPrice} onChange={(e) => onValueChange(e)} required />
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label htmlFor="discount-percentage" style={{ marginBottom: '6px' }}>Discount Percentage ( Without % Sign )</label>
                                <input type="text" className="form-control" id="discount-percentage" name="discountPercentage" placeholder='Write the discount percentage' value={product.discountPercentage} onChange={(e) => onValueChange(e)} required />
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label htmlFor="category" style={{ marginBottom: '5px' }}>Category</label><br />
                                <label><input type="radio" name="category" value="Men" onChange={(e) => onValueChange(e)} checked={product.category === 'Men'} /> Men</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <label><input type="radio" name="category" value="Women" onChange={(e) => onValueChange(e)} checked={product.category === 'Women'} /> Women</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <label><input type="radio" name="category" value="Kids" onChange={(e) => onValueChange(e)} checked={product.category === 'Kids'} /> Kids</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Size</label><br />
                                {['6C', '7C', '8C', '9C', '10C', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((size) => (
                                    <label key={size} className="custom-checkbox" style={{ fontSize: '20px', marginRight:'15px' }}>
                                        <input
                                            type="checkbox"
                                            value={size}
                                            onChange={handleSizeChange}
                                            style={{ width: '18px', height: '18px' }}
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                            {product.sizes.map((size) => (
                                <div key={size} className="form-group" style={{ marginTop: '15px' }}>
                                    <label htmlFor={`stock-${size}`} style={{ marginBottom: '6px' }}>Stock for {size}</label>
                                    <input
                                        type="number"
                                        id={`stock-${size}`}
                                        name={size}
                                        value={product.stocks[size] || ''}
                                        onChange={handleStockChange}
                                        className="form-control"
                                        placeholder={`Enter stock for ${size}`}
                                        required
                                    />
                                </div>
                            ))}
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label htmlFor="product-image" style={{ marginBottom: '6px' }}>Add Product Image</label><br />
                                <input type="file" name="image" id="logo" accept="image/jpeg, image/png, image/jpg, image/gif" required />
                            </div>
                            {isError && <h6 className="text-center text-danger">Failed to Add Product!</h6>}
                            {isAdded && <h6 className="text-center text-success">Successfully Product Added!</h6>}
                            <div className="row align-items-center mb-5">
                                <div className="col-lg-4 ml-auto">
                                    <div className="row">
                                        <div className="col-6" style={{ marginTop: '30px', marginBottom: '-20px' }}>
                                            <input type="submit" value="Add Product" className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', borderColor: 'black' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddProduct;