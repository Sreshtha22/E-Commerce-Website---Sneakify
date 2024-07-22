import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        <li className="breadcrumb-item">
          <Link to="/" title="Home" style={{color:'black', textDecoration:'none'}}>
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/category-3" title="kids" style={{color:'black', textDecoration:'none'}}>
            Kids
          </Link>
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumb;