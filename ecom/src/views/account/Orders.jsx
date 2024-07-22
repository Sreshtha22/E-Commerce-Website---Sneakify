import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchOrderItemsData, getProduct, updateOrderShippingStatus, saveReturnOrder, fetchReturnOrderStatus, updateQuantity } from "../../api.js";

const OrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [displayTimestamp, setDisplayTimestamp] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userData = localStorage.getItem('data');
      const orderItems = await fetchOrderItemsData();
      const filteredOrders = orderItems.filter(order => order.order.email === userData);
      setOrder(filteredOrders);
      const updatedOrder = await Promise.all(filteredOrders.map(async (order) => {
        const productDetails = await getProduct(order.productId);
        const returnStatus = await fetchReturnOrderStatus(order.order.id, order.productId);
        return {
          ...order,
          image: productDetails.image,
          returnStatus: returnStatus.status
        };
      }));
      setOrders(updatedOrder);
      console.log("Order:", order);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateShippingStatus = async (orderId, productId, newStatus) => {
    try {
      const response = await updateOrderShippingStatus(orderId, productId, newStatus);
      console.log("Response:", response);
      fetchOrders();
    } catch (error) {
      console.error('Error updating shipping status: ', error);
    }
  };

  const handleReturnButtonClick = async (orderId, productId) => {
    try {
      const userData = localStorage.getItem('data');
      const currentDate = new Date().toISOString();
      const currentOrder = orders.find(order => order.order.id === orderId && order.productId === productId);
      if (!currentOrder) {
        console.error('Error: Order not found');
        return;
      }
      const { id, date, address1, address2, city, zip, landmark } = currentOrder.order;
      const response = await saveReturnOrder(userData, id, date, currentDate, productId, currentOrder.productName, currentOrder.price, address1, address2, city, zip, landmark);
      const currentOrders = orders.find(order => order.order.id === orderId && order.productId === productId);
      if (!currentOrders) {
        console.error('Error: Order not found');
        return;
      }
      await updateQuantity(productId, currentOrders.size, currentOrders.quantity);
      console.log("Return response:", response);
      await updateShippingStatus(orderId, productId, "Returned");
    } catch (error) {
      console.error('Error handling return process: ', error);
    } finally {
      fetchOrders();
    }
  };

  const handleCancelButtonClick = async (orderId, productId) => {
    try {
      const currentOrder = orders.find(order => order.order.id === orderId && order.productId === productId);
      if (!currentOrder) {
        console.error('Error: Order not found');
        return;
      }
      console.log(currentOrder);
      await updateQuantity(productId, currentOrder.size, currentOrder.quantity);
      await updateShippingStatus(orderId, productId, "Cancelled");
    } catch (error) {
      console.error('Error handling cancel process:', error);
    } finally {
      fetchOrders();
    }
  };

  const renderImage = (imageData) => {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return <img src={imageUrl} alt="Product" style={{ maxWidth: "100px", maxHeight: "100px", marginTop: '10px'}} />;
  };

  const isReturnButtonVisible = () => {
    if (displayTimestamp === null) return false; 
    const SEVEN_DAYS_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
    const currentTime = Date.now();
    const timeSinceDisplay = currentTime - displayTimestamp;
    return timeSinceDisplay < SEVEN_DAYS_IN_MILLISECONDS;
  };

  useEffect(() => {
    const deliveredOrder = orders.find(order => order.shippingStatus === "Delivered");
    if (deliveredOrder) {
      setDisplayTimestamp(Date.now());
    }
  }, [orders]);

  return (
    <div className="container mb-3">
      <h4 className="my-3">ORDERS</h4>
      <div className="row g-3">
        {orders.map(order => (
          <div className="col-md-6" key={order.id}>
            <div className="card" style={{ borderColor: "black" }}>
              <div className="row g-0">
                <div className="col-md-3 text-center">
                  {renderImage(order.image)}
                </div>
                <div className="col-md-9">
                  <div className="card-header bg-white">
                    <div className="small">
                      <span className="border bg-black bg-secondary rounded-left px-2 text-white">
                        Order ID
                      </span>
                      <span className=" bg-white rounded-right px-1 me-3">
                        #{order.order.id}
                      </span>
                      <span className="border bg-black bg-secondary rounded-left px-2 text-white">
                        Date
                      </span>
                      <span className=" bg-white rounded-right px-2">
                        {order.order.date}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6>
                      <Link to={`/product/detail/${order.productId}`} className="text-black text-decoration-none">
                        {order.productName}
                      </Link>
                    </h6>
                    <div className="small">
                      <span className="text-muted me-2">Size:</span>
                      <span className="me-3">{order.size}</span>
                      <span className="text-muted me-2">Quantity:</span>
                      <span className="me-3">{order.quantity}</span>
                      <span className="text-muted me-2">Price:</span>
                      <span className="me-3">₹{order.price * order.quantity}</span>
                    </div>
                    <div className="mt-2"></div>
                  </div>
                  <div className="card-footer bg-white">
                  <span className="text-muted me-2">Status :</span>
                  {order.shippingStatus === "Returned" && order.returnStatus ? (
                      <span className="me-2" style={{ color: "green" }}>{order.returnStatus}</span>
                    ) : (
                      <span className="me-2" style={{ color: order.shippingStatus === "Cancelled" ? "red" : "inherit" }}>{order.shippingStatus}</span>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {(order.shippingStatus === "Order Confirmed" ) && (
                      <button
                      onClick={() => handleCancelButtonClick(order.order.id, order.productId)}
                        style={{ borderRadius: '6px', color: "black", backgroundColor: "whitesmoke" }}
                      >
                        Cancel
                      </button>
                    )}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {order.shippingStatus === "Delivered" &&  isReturnButtonVisible() && (
                      <button
                      onClick={() => handleReturnButtonClick(order.order.id, order.productId)}
                        style={{ borderRadius: '6px', color: "black", backgroundColor: "whitesmoke" }}
                      >
                        Return
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
