import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0" style={{backgroundColor :"white", marginTop:"1px"}}>
        <li className="breadcrumb-item">
          <Link to="/account/admindash" title="Home" style={{ color:'black', textDecoration:'none'}}>
            Dashboard
          </Link>
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumb;