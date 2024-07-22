import React, { useState, useEffect } from "react";
import { getCart, getProduct, getCustomerData, checkOut, updateProductQuantity, removeCart } from "../../api.js";
import { useNavigate } from "react-router-dom";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit
} from "../../helpers/validation";

const CheckoutView = (props) => {
  const { submitting } = props;
  const [quantities, setQuantities] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    email: "",
    phno: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    landmark: "",
    payment: ""
  });

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const userData = localStorage.getItem('data');
      const cartData = await getCart(userData);
      const initialQuantities = cartData.map(() => 1);
      setQuantities(initialQuantities);
      const customerInfo = await getCustomerData(userData);
      setCustomerData(customerInfo);
      const updatedCart = await Promise.all(cartData.map(async (item) => {
        const productDetails = await getProduct(item.productId);
        return {
          ...item,
          image: productDetails.image
        };
      }));
      setCart(updatedCart);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cart.map(item => ({
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }));

      const orderData = {
        date: new Date(),
        email: customerData.email,
        phno: customerData.phno,
        name: customerData.name,
        address1: customerData.address1,
        address2: customerData.address2,
        city: customerData.city,
        zip: customerData.zip,
        landmark: customerData.landmark,
        payment: customerData.payment,
        items: orderItems
      };

      if (customerData.payment === "COD") {
        await handleCODOrder(orderData);
      } else {
        await handleOnlinePayment(orderData);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      navigate('/fail', { replace: true });
    }
  };

  const handleCODOrder = async (orderData) => {
    await processOrder(orderData);
    navigate('/success', { replace: true });
    window.location.reload();
  };

  const handleOnlinePayment = async (orderData) => {
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100;

    const options = {
      key: "rzp_test_47XQ9y61FqkFKN", 
      amount: totalAmount,
      currency: "INR",
      name: "Sneakify",
      description: "Order Payment",
      handler: async function (response) {
        orderData.paymentId = response.razorpay_payment_id;
        await processOrder(orderData);
        navigate('/success', { replace: true });
        window.location.reload();
      },
      prefill: {
        name: customerData.name,
        email: customerData.email,
        contact: customerData.phno
      },
      notes: {
        address: customerData.address1
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const processOrder = async (orderData) => {
    await Promise.all(cart.map(async (item) => {
      const size = item.size;
      await updateProductQuantity(item.productId, size, item.quantity);
    }));
    const userData = localStorage.getItem('data');
    await removeCart(userData);
    await checkOut(orderData);
  };

  return (
    <div>
      <form onSubmit={handleSubmitOrder}>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6 text-center">Checkout</h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-3" style={{ borderColor: "black" }}>
                <div className="card-header" style={{ backgroundColor: "black", color: "white" }}>
                  <i className="bi bi-envelope"></i> Contact Info
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Registered email address"
                        aria-label="Email Address"
                        value={customerData.email}
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, email: e.target.value }))}
                        required={true}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Please enter your valid email address"
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile no. without country code"
                        aria-label="Mobile no"
                        value={customerData.phno}
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, phno: e.target.value }))}
                        pattern="^[0-9]{10}$"
                        title="Please enter your valid mobile number"
                        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
                        required={true}
                        max="9999999999"
                        min="9999999999"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3" style={{ borderColor: "black" }}>
                <div className="card-header" style={{ backgroundColor: "black", color: "white" }}>
                  <i className="bi bi-truck"></i> Shipping Info
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address 1"
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, address1: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address 2 (Optional)"
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, address2: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, city: e.target.value }))}
                        required
                      >
                        <option value>City</option>
                        <option>Asansol</option>
                        <option>Howrah</option>
                        <option>Kolkata</option>
                        <option>Malda</option>
                        <option>Raiganj</option>
                        <option>Salt Lake</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip"
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, zip: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Landmark"
                        onChange={(e) => setCustomerData(prevState => ({ ...prevState, landmark: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3" style={{ borderColor: "black" }}>
                <div className="card-header" style={{ backgroundColor: "black", color: "white" }}>
                  <i className="bi bi-credit-card-2-front"></i> Payment Method
                </div>
                <div className="card-body">
                  <input
                    type="radio"
                    id="option1"
                    name="payment"
                    value="COD"
                    onChange={(e) => setCustomerData(prevState => ({ ...prevState, payment: e.target.value }))}
                    required
                  />
                  <label htmlFor="option1" style={{ paddingLeft: "15px" }}>Cash On Delivery</label>
                  <br />
                  <input
                    type="radio"
                    id="option2"
                    name="payment"
                    value="CARD"
                    onChange={(e) => setCustomerData(prevState => ({ ...prevState, payment: e.target.value }))}
                    required
                  />
                  <label htmlFor="option2" style={{ paddingLeft: "15px" }}>Pay Online</label>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" style={{ borderColor: "black" }}>
                <div className="card-header" style={{ backgroundColor: "black", color: "white" }}>
                  <i className="bi bi-cart3"></i> Cart{" "}
                  <span className="badge bg-secondary float-end">{cart.length}</span>
                </div>
                <ul className="list-group list-group-flush">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <p className="my-0">{item.productName}</p>
                        <small className="text-muted">Size : {item.size} Quantity: {item.quantity}</small>
                      </div>
                      <span>₹ {item.price * item.quantity}</span>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between">
                    <span><h6>Total</h6> </span>
                    <strong>₹ {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-8" style={{ textAlign: 'center' }}>
              <button
                type="submit"
                className="btn btn-dark mb-3"
                disabled={submitting}
                style={{ background: "black", borderColor: "black" }}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutView;
