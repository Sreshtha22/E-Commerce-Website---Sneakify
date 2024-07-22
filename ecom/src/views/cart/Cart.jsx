import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, updateCart, removeFromCart, getProduct } from "../../api.js";
const CartView = () => {
  const [quantities, setQuantities] = useState();
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartData();
  }, []);
  const fetchCartData = async () => {
    try {
      const userData = localStorage.getItem('data');
      const cartData = await getCart(userData);
      const initialQuantities = cartData.map(() => 1);
      setQuantities(initialQuantities);
      const updatedCart = await Promise.all(cartData.map(async (item) => {
        const productDetails = await getProduct(item.productId);
        console.log("Product Details : ", productDetails);
        console.log("Size : ", item.size);
        const availableQuantity = getProductQuantityForSize(productDetails, item.size);
        return {
          ...item,
          image: productDetails.image,
          availableQuantity: availableQuantity
        };
      }));
      setCart(updatedCart);
      console.log(cart);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getProductQuantityForSize = (productDetails, size) => {
    if (productDetails && productDetails.sizeQuantities && productDetails.sizeQuantities[size]) {
      return productDetails.sizeQuantities[size];
    }
    return 0; 
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };
  const handlePurchase = async () => {
    try {
      const userData = localStorage.getItem('data');
      if (userData === null) {
        setMsg('Please login first to make purchase!');
        setTimeout(() => {
          setMsg('');
        }, 2000);
      } else if (cart.length === 0) {
        setMsg('Please add products to your cart before proceeding to purchase!');
        setTimeout(() => {
          setMsg('');
        }, 2000);
      } 
      else {
        await updateCart(cart);
        navigate('/checkout', { replace: true })
      }
    } catch (error) {
      console.error('Error purchasing:', error);
      setMsg('Error purchasing. Please try again later!');
      setTimeout(() => {
        setMsg('');
      }, 2000)
    }
  };
  const handleDeleteItem = async (index) => {
    try {
      const userData = localStorage.getItem('data');
      await removeFromCart(userData, cart[index].productId, cart[index].size);
      const updatedCart = cart.filter((item, i) => i !== index);
      setCart(updatedCart);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const renderImage = (imageData) => {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return <img src={imageUrl} alt="Product" style={{ maxWidth: "100px", maxHeight: "100px" }} />;
  };
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6 text-center">Shopping Cart</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="card" style={{ borderColor: "black" }}>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted table-responsive">
                    <tr className="small text-uppercase">
                      <th scope="col">Product Details</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150} style={{ paddingLeft: "25px" }}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              {renderImage(item.image)}
                            </div>
                            <div className="col">
                              <Link
                                to={`/product/detail/${item.productId}`}
                                className="text-decoration-none"
                                style={{ color: "black" }}
                              >
                                <strong>{item.productName}</strong>
                              </Link>
                              <p className="small text-muted">
                                Size: {item.size}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="input-group input-group-sm ">
                            <button
                              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() => decreaseQuantity(index)}
                            >
                              <i className="bi bi-dash-lg"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() => increaseQuantity(index)}
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                          {item.quantity > item.availableQuantity && (
                            <p className="text-danger">Only {item.availableQuantity} left in stock</p>
                          )}
                        </td>
                        <td>
                          <var className="price" style={{ paddingLeft: "25px" }}>₹{item.price}</var>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteItem(index)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {msg && <h6 className="text-danger text-center" style={{ marginTop: '10px' }}>{msg}</h6>}
          </div><br></br>
          <div className="col-lg-3">
            <div className="card" style={{ borderColor: "black" }}>
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Price Details</dt>
                </dl>
                {cart.map((item, index) => (
                  <dl key={index} className="row">
                    <p className="col-6">{item.productName}</p>
                    <dd className="col-6 text-end">
                      <strong>₹{item.price * item.quantity}</strong>
                    </dd>
                  </dl>
                ))}
                <hr />
                <dl className="row">
                  <p className="col-6">Total Price</p>
                  <dd className="col-6 text-end">
                    <strong>
                      ₹
                      {cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </strong>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer" style={{ paddingTop: "15px" }}>
          <div className="container">
            <div className="row" >
              <div className="col-md-2" >
                <Link to="/" style={{ backgroundColor: 'black', borderColor: 'black' }} className="btn btn-secondary w-100">
                  <i className="bi bi-chevron-left"></i> Shopping
                </Link>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="col-md-2">
                <button onClick={handlePurchase} className="btn btn-primary w-100" disabled={cart.length === 0} style={{ backgroundColor: 'black', borderColor: 'black' }}>
                  Purchase <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartView; 