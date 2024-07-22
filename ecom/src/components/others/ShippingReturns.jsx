import React from "react";
import { Link } from "react-router-dom";
const ShippingReturns = (props) => {
  return (
    <React.Fragment>
       <ul><h5 style={{textAlign : "justify"}}>
        <li>Standard delivery is 4-5 Business Days</li>
        <li>Orders are processed and delivered Monday - Saturday  </li>
        <li>Invoice copy is provided with the Packaging of the Product  </li>
        <li>
          7 Days Return Policy&nbsp;&nbsp; <Link to="/Return" style={{color : "black"}}> Know More</Link></li>
        </h5></ul> 
    </React.Fragment>
  );
};
export default ShippingReturns;