import { lazy } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart } from "../api.js";
const Search = lazy(() => import("./Search"));
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
    setIsSignInClicked(false);
  };
  const handleSignInClick = () => {
    setIsSignInClicked(true);
    setIsSignUpClicked(false);
  }
  useEffect(() => {
    const v = localStorage.getItem("data");
    setIsLoggedIn(v !== null);
  }, [isLoggedIn]);
  useEffect(() => {
    const v = localStorage.getItem("data");
    setIsLoggedIn(v !== null);
    fetchCartQuantity(); 
  }, []); 
  const handleLogout = () => {
    localStorage.removeItem("data");
    setIsLoggedIn(false);
    window.location.reload();
  };
  const fetchCartQuantity = async () => {
    try {
      const userData = localStorage.getItem('data');
      const cartData = await getCart(userData);
      const uniqueProducts = new Set();
      cartData.forEach(item => {
        const key = `${item.productId}-${item.size}`;
        uniqueProducts.add(key);
      });
      setCartQuantity(uniqueProducts.size);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  return (
    <header className="p-3 border-bottom bg-light" style={{ position: "sticky", top: "0", zIndex: "1000" }}>
      <div className="container-fluid">
        <div className="row g-3 align-items-center justify-content-between">
          <div className="col-md-3 text-center">
            <Link to="/">
              <img alt="logo" src="../../images/(0).png" style={{ height: "44px", width: "159px" }} />
            </Link>
          </div>
          <div className="col-md-5 col-sm-8 text-center">
            <Search />
          </div>
          <div className="col-md-3 col-sm-4 d-flex justify-content align-items-center">
            <div className="btn-group me-3">
              <button type="button" className="btn btn" data-toggle="dropdown" aria-expanded="false" aria-label="Profile" data-bs-toggle="dropdown" style={{ border: 'none', outline: 'none' }}>
                <i className="bi bi-person-fill text-black" style={{ fontSize: "26px" }}></i>
              </button>
              <ul className="dropdown-menu">
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account/myprofile"
                        style={{ backgroundColor: isSignUpClicked ? "white" : "inherit" }}>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/orders"
                        style={{ backgroundColor: isSignUpClicked ? "white" : "inherit" }}>
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" style={{ backgroundColor: isSignUpClicked ? "white" : "inherit" }} onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account/signup" onClick={handleSignUpClick}
                        style={{ backgroundColor: isSignUpClicked ? "white" : "inherit" }}>
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/signin" onClick={handleSignInClick}
                        style={{ backgroundColor: isSignUpClicked ? "white" : "inherit" }}>
                        Sign In as Customer
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/signinadmin" onClick={handleSignInClick}
                        style={{ backgroundColor: isSignUpClicked ? "white" : "inherit" }}>
                        Sign In as Admin
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="position-relative d-inline">
              <Link to="/cart" className="btn" style={{ border: 'none', outline: 'none' }}>
                <i className="bi bi-cart3" style={{ fontSize: "24px" }}></i>
              </Link>
              {cartQuantity > 0 && (
                <div className="top-45 start-100 translate-middle badge bg-danger rounded-circle" style={{marginLeft:'-10px'}}>
                  {cartQuantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;