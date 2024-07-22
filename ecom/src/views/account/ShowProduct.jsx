import React, { lazy, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../../api.js";
const Breadcrumb = lazy(() => import("../../components/Breadcrumb4"));
function ShowProduct() {
  const [prods, setProds] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const products = await fetchProducts();
      setProds(products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProds(prevProducts => prevProducts.filter(prod => prod.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const renderImage = (imageData) => {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return <img src={imageUrl} alt="Product" style={{ width: '100px' }} />;
  };
  const handleLogout = () => {
    localStorage.removeItem("value");
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
              <h1 className="display-6">Show Products</h1>
            </div>
            <div className="col-md-3 text-end">
              <Link to="/account/signinadmin" className="text-white" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                <button className="btn btn-dark"onClick={handleLogout}> Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "-16px", display: "flex" }}><Breadcrumb /><span style={{ marginTop: "9px", marginLeft: "-10px" }}>/ Show Products</span></div>
      <div style={{ padding: "40px" }}>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-condensed" width="80%" align="center">
            <thead>
              <tr>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product ID</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Name</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Original Price</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Discounted Price</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Discount(in %)</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Size And Stock</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Image</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Delete Product</center></th>
              </tr>
            </thead>
            <tbody>
              {prods.map(prod => (
                <tr key={prod.id}>
                  <td><center>{prod.id}</center></td>
                  <td><center>{prod.name}</center></td>
                  <td><center>{prod.originalPrice}</center></td>
                  <td><center>{prod.discountedPrice}</center></td>
                  <td><center>{prod.discountPercentage}</center></td>
                  <td>
                    <center>
                      {Object.entries(prod.sizeQuantities).map(([size, quantity]) => (
                        <div key={size}>
                          Size: {size}, Quantity: {quantity}
                        </div>
                      ))}
                    </center></td>
                  <td><center>{renderImage(prod.image)}</center></td>
                  <td><center>
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-md text-white"
                      style={{ marginLeft: '30px', backgroundColor: 'black' }}
                      onClick={() => handleDelete(prod.id)}
                    />
                  </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ShowProduct;