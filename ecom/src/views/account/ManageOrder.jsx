import React, { lazy, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchOrderItemsData, updateOrderShippingStatus } from "../../api.js";
const Breadcrumb = lazy(() => import("../../components/Breadcrumb4"));
function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const orderItems = await fetchOrderItemsData();
      setOrders(orderItems);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  const updateShippingStatus = async (orderId, productId, newStatus) => {
    try {
      const response = await updateOrderShippingStatus(orderId, productId, newStatus);
      console.log("Response:", response);
      fetchData();
    } catch (error) {
      console.error('Error updating shipping status: ', error);
    }
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
              <h1 className="display-6">Manage Orders</h1>
            </div>
            <div className="col-md-3 text-end">
              <Link to="/account/signinadmin" className="text-white" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                <button className="btn btn-dark" onClick={handleLogout}> Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "-16px", display: "flex" }}>
        <Breadcrumb />
        <span style={{ marginTop: "9px", marginLeft: "-10px" }}>/ Manage Orders</span>
      </div>
      <div style={{ padding: "40px" }}>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-condensed" width="80%" align="center">
            <thead>
              <tr>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Order ID</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Order Date</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Customer Name</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Customer Email</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Id</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Name</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Price</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Shipping Address</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Shipping Status</center></th>
              </tr>
            </thead>
            {orders && orders.length > 0 ? (
              <tbody>
                {orders.map(orderItem => (
                  <tr key={orderItem.id}>
                    <td><center>{orderItem.order.id}</center></td>
                    <td><center>{orderItem.order.date}</center></td>
                    <td><center>{orderItem.order.name}</center></td>
                    <td><center>{orderItem.order.email}</center></td>
                    <td><center>{orderItem.productId}</center></td>
                    <td><center>{orderItem.productName}</center></td>
                    <td><center>{orderItem.price}</center></td>
                    <td><center>{orderItem.order.address1}<br />Alternative Address -{orderItem.order.address2}<br />City-{orderItem.order.city}<br />Zip-{orderItem.order.zip}<br />Landmark-{orderItem.order.landmark}</center></td>
                    <td>
                      <center>
                      <h6 style={{ color: orderItem.shippingStatus === "Cancelled" ? "red" : orderItem.shippingStatus === "Returned" ? "green" : "inherit" }}>{orderItem.shippingStatus}</h6>
                        <button className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', margin: '10px', borderColor: 'black' }} onClick={() => updateShippingStatus(orderItem.order.id, orderItem.productId, "Order Confirmed")} disabled={orderItem.shippingStatus==="Cancelled" || orderItem.shippingStatus === "Returned"|| orderItem.shippingStatus === "Order Confirmed" || orderItem.shippingStatus === "Shipped" || orderItem.shippingStatus === "Out For Delivery" || orderItem.shippingStatus === "Delivered"}>Order Confirmed</button>

                        <button className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', margin: '10px', borderColor: 'black' }} onClick={() => updateShippingStatus(orderItem.order.id, orderItem.productId, 'Shipped')} disabled={orderItem.shippingStatus==="Cancelled" || orderItem.shippingStatus === "Returned" || orderItem.shippingStatus === "Shipped" ||  orderItem.shippingStatus === "Out For Delivery" || orderItem.shippingStatus === "Delivered"}>Shipped</button>

                        <button className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', margin: '10px', borderColor: 'black' }} onClick={() => updateShippingStatus(orderItem.order.id, orderItem.productId, 'Out For Delivery')} disabled={orderItem.shippingStatus==="Cancelled" || orderItem.shippingStatus === "Returned" ||  orderItem.shippingStatus === "Out For Delivery" || orderItem.shippingStatus === "Delivered"}>Out For Delivery</button>

                        <button className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', margin: '10px', borderColor: 'black' }} onClick={() => updateShippingStatus(orderItem.order.id, orderItem.productId, 'Delivered')} disabled={orderItem.shippingStatus==="Cancelled" || orderItem.shippingStatus === "Returned" || orderItem.shippingStatus === "Delivered"}>Delivered</button>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </div >
  );
}
export default OrderList; 