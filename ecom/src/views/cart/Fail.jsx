import React from 'react';
import "./SuccessFail.css";
import { Link } from "react-router-dom";
const FailView = () => {
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className='card' style={{borderColor : "white"}}>
          <div className="success-page">
            <h2 style={{ color: 'red' }}><strong>Sorry!</strong></h2>
            <p style={{ fontSize: '1.5rem' }}><i>Order Not Placed</i></p>
            <Link to="/cart">
              <button
                type="submit"
                className="btn btn"
                style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}
              >
                Go To Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FailView;