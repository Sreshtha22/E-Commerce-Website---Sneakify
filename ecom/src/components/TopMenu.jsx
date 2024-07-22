import { Link } from "react-router-dom";
import { useState } from "react";
const TopMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0" style={{ position: "sticky", top: "82px", zIndex: "10" }}>
      <div className="container-fluid">
      <div className="justify-content-center">
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto justify-content-between w-50">
          <li className="nav-item">
            <Link className="nav-link" to="/category-1" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Men
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category-2" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Women
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category-3" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Kids
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/team" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Team
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/faq" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact-us" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};
export default TopMenu;