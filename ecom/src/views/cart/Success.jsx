import React from 'react';
import "./SuccessFail.css";
import { Link } from "react-router-dom";
const SuccessView = () => {
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className='card' style={{borderColor : "white"}}>
          <div className="success-page">
            <h2 style={{ color: 'green' }}><strong>Congratulation!</strong></h2>
            <p style={{ fontSize: '1.5rem' }}><i>Order Confirmed</i></p>
            <Link to="/account/orders">
              <button
                type="submit"
                className="btn btn"
                style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}
              >
                Order History
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessView;