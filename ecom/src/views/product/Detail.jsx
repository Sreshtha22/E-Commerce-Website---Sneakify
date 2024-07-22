import React, { lazy, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, addToCart, isSizeInCart } from "../../api.js";

const Details = lazy(() => import("../../components/others/Details"));
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));

const ProductDetailView = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [prods, setProds] = useState(null);
  const [sizeInCart, setSizeInCart] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const products = await getProduct(id);
      console.log("Fetched product:", products);
      const sizes = Object.keys(products.sizeQuantities);
      const sizesArray = sizes.map((size) => ({
        size,
        quantity: products.sizeQuantities[size],
      }));
      const updatedProductData = { ...products, sizes: sizesArray };
      setProds(updatedProductData);
      console.log("Fetched product:", updatedProductData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToCart = async () => {
    const userData = localStorage.getItem('data');
    if (userData === null) {
      setMsg('Please login first to add products to your cart!');
      setTimeout(() => {
        setMsg('');
      }, 2000);
    } else {
      if (!selectedSize) {
        setMsg('Please select a size before adding to cart!');
        setTimeout(() => {
          setMsg('');
        }, 2000);
      } else {
        try {
          await addToCart(
            userData,
            prods.image,
            prods.id,
            prods.name,
            prods.discountedPrice,
            quantity,
            selectedSize
          );
          setSizeInCart(true);
          setSuccess('Product added to cart successfully!');
          setTimeout(() => {
            setSuccess('');
          }, 2000);
          window.location.reload();
        } catch (error) {
          console.error('Error adding product to cart:', error);
          setMsg('Failed to add product to cart. Please try again later.');
          setTimeout(() => {
            setMsg('');
          }, 2000);
        }
      }
    }
  };

  useEffect(() => {
    const checkSizeInCart = async () => {
      if (prods && selectedSize) {
        try {
          const userData = localStorage.getItem('data');
          const isInCart = await isSizeInCart(prods.id, selectedSize, userData);
          setSizeInCart(isInCart);
        } catch (error) {
          console.error('Error checking size in cart:', error);
          setSizeInCart(false);
        }
      }
    };
    checkSizeInCart();
  }, [prods, selectedSize]);

  const handleBuyNow = async () => {
    const userData = localStorage.getItem('data');
    if (userData === null) {
      setMsg('Please login first to make purchase!');
      setTimeout(() => {
        setMsg('');
      }, 2000);
    } else {
      if (!selectedSize) {
        setMsg('Please select a size before adding to cart!');
        setTimeout(() => {
          setMsg('');
        }, 2000);
      } else {
        try {
          await addToCart(
            userData,
            prods.image,
            prods.id,
            prods.name,
            prods.discountedPrice,
            quantity,
            selectedSize
          );
          navigate('/cart', { replace: true });
          window.location.reload();
        } catch (error) {
          console.error('Error adding product to cart:', error);
          setMsg('Failed to add product to cart. Please try again later.');
          setTimeout(() => {
            setMsg('');
          }, 2000);
        }
      }
    }
  };
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const renderImage = (imageData) => {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return <img src={imageUrl} alt="Product" style={{ width: "200px", height: "150px" }} />;
  };

  const handleGoToCart = () => {
    navigate('/cart', { replace: true });
    window.location.reload();
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          {prods && (
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                {renderImage(prods.image)}
              </div>
              <div className="col-md-7">
                <h1 className="h4 d-inline me-2">{prods.name}</h1>
                <div className="mb-3">
                  <h4 className="col-sm-1" style={{ fontSize: "17px", marginBottom: "10px", marginTop: '10px' }}>
                    Size
                  </h4>
                  <div className="row">
                    {prods && prods.sizes && prods.sizes.map((sizeObject) => (
                      <div key={sizeObject.size} className="col-2" style={{ maxWidth: "90px" }}>
                        <input
                          type="radio"
                          name="size"
                          id={`size-${sizeObject.size}`}
                          value={sizeObject.size}
                          checked={selectedSize === sizeObject.size}
                          onChange={() => handleSizeChange(sizeObject.size)}
                          disabled={sizeObject.quantity === 0}
                          required
                        />
                        <label
                          className={`form-check-label ms-2 ${sizeObject.quantity === 0 ? 'text-muted' : ''}`}
                          htmlFor={`size-${sizeObject.size}`}
                          style={{ fontSize: "17px", cursor: sizeObject.quantity === 0 ? 'not-allowed' : 'pointer' }}
                        >
                          {sizeObject.size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3" style={{ marginTop: '30px' }}>
                  <span className="fw-bold h4 me-2">₹{prods.discountedPrice}</span>
                  <del className="small text-muted me-2">₹{prods.originalPrice}</del>
                  <span className="rounded p-1 bg-black  me-2 small" style={{ color: "white" }}>
                    -{prods.discountPercentage}%
                  </span>
                </div>
                {msg && <h6 className="text-danger">{msg}</h6>}
                {success && <h6 className="text-success">{success}</h6>}
                <div className="mb-3" style={{ marginTop: '30px' }}>
                  <div className="d-inline float-start me-2">
                    <div className="input-group input-group-sm mw-140" style={{ width: "90px" }}>
                      <button
                        className="btn btn-primary text-white bg-black border-black"
                        type="button"
                        onClick={decrementQuantity}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-primary text-white bg-black border-black"
                        type="button"
                        onClick={incrementQuantity}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </div>
                  {sizeInCart ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-2 bg-black border-black"
                      title="Go to Cart"
                      onClick={handleGoToCart}
                    >
                      <i className="bi bi-cart-plus me-1"></i>Go to Cart
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-2 bg-black border-black"
                      title="Add to cart"
                      onClick={handleAddToCart}
                    >
                      <i className="bi bi-cart-plus me-1"></i>Add to cart
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm text-white btn-warning me-2 bg-black border-black"
                    title="Buy now"
                    onClick={handleBuyNow}
                  >
                    <i className="bi bi-cart3 me-1" style={{ color: "white" }}></i>Buy now
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active text-black"
                    id="nav-details-tab"
                    data-bs-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                  <a
                    className="nav-link text-black"
                    id="nav-faq-tab"
                    data-bs-toggle="tab"
                    href="#nav-faq"
                    role="tab"
                    aria-controls="nav-faq"
                    aria-selected="false"
                  >
                    Questions and Answers
                  </a>
                  <a
                    className="nav-link text-black"
                    id="nav-ship-returns-tab"
                    data-bs-toggle="tab"
                    href="#nav-ship-returns"
                    role="tab"
                    aria-controls="nav-ship-returns"
                    aria-selected="false"
                  >
                    Shipping & Return
                  </a>
                  <a
                    className="nav-link text-black"
                    id="nav-size-chart-tab"
                    data-bs-toggle="tab"
                    href="#nav-size-chart"
                    role="tab"
                    aria-controls="nav-size-chart"
                    aria-selected="false"
                  >
                    Size Chart
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent" style={{ border: 'none' }}>
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  {prods && <Details data={prods} />}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-faq"
                  role="tabpanel"
                  aria-labelledby="nav-faq-tab"
                >
                  <dl>
                    {Array.from({ length: 1 }, (_, key) => (
                      <QuestionAnswer key={key} />
                    ))}
                  </dl>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-size-chart"
                  role="tabpanel"
                  aria-labelledby="nav-size-chart-tab"
                >
                  <SizeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default ProductDetailView;
