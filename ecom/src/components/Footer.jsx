import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ marginTop: '4%', backgroundColor: 'black' }} className="site-footer">
      <a href="#top" className="smoothscroll scroll-top">
        <span className="icon-keyboard_arrow_up"></span>
      </a>
      <div className="container" style={{ padding: '72px 10px' }}>
        <div className="row mb-5" style={{ fontFamily: "sans-serif", color: "white" }}>
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 justify-content-centre">
            <Link to = "/" ><img src="/images/(01).png" alt="" style={{ width: '235px', height: '50px' }} /></Link><br /><br />
            <p className="my-3" style={{ textAlign: 'justify', color: 'rgba(255, 255, 255, 0.8)' }}>Sustainable sneakers crafted with passion, making a difference one step at a time. Join our journey to walk with purpose and style. Together, let's redefine footwear and leave a positive impact on the world.</p>
            <h3 className="my-4">Connect with us:</h3>
            <div className="footer-social">
              <Link to="https://www.facebook.com/" title="Facebook">
                <i className="bi bi-facebook text-light me-3"></i>
              </Link>
              <Link to="https://www.instagram.com/" title="Instagram">
                <i className="bi bi-instagram text-light me-3"></i>
              </Link>
              <Link to="https://twitter.com/" title="Twitter">
                <img src="../images/Twtr.png" style={{ paddingRight: "11px", paddingTop: "0.05px" }} alt="Twitter" />
              </Link>
              <Link to="https://www.linkedin.com/" title="LinkedIn">
                <i className="bi bi-linkedin text-light me-3"></i>
              </Link>
              <br />
              <br />
              <p>
                <b>Email:</b> <Link to = "https://gmail.com/" style={{textDecoration : "none", color : "white"}} >sneakify05@gmail.com</Link>
                <br />
                <b>Phone: </b>+91 9876543210
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <h3 style={{ marginLeft: '40px' }}>Categories</h3>
            <ul className="list-unstyled my-3" style={{ marginLeft: '40px' }}>
              <li><Link className="dropdown-item my-2" to="/category-1">Men</Link></li>
              <li><Link className="dropdown-item my-2" to="/category-2">Women</Link></li>
              <li><Link className="dropdown-item my-2" to="/category-3">Kids</Link></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <h3 style={{ marginLeft: '40px' }}>Pages</h3>
            <ul className="list-unstyled my-3" style={{ marginLeft: '40px' }}>
              <li><Link className="dropdown-item my-2" to="/about">About Us</Link></li>
              <li><Link className="dropdown-item my-2" to="/faq">FAQs</Link></li>
              <li><Link className="dropdown-item my-2" to="/team">Team</Link></li>
              <li><Link className="dropdown-item my-2" to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <h3 style={{ marginLeft: '40px' }}>Policy</h3>
            <ul className="list-unstyled my-3" style={{ marginLeft: '40px' }}>
              <li><Link className="dropdown-item my-2" to="/return">Return Policy</Link></li>
              <li><Link className="dropdown-item my-2" to="/terms">Terms of Use</Link></li>
              <li><Link className="dropdown-item my-2" to="/security">Security</Link></li>
              <li><Link className="dropdown-item my-2" to="/privacy">Privacy</Link></li>
              <li><Link className="dropdown-item my-2" to="/payment">Payment</Link></li>
            </ul>
          </div>
        </div>
        <div className="row text-center" style={{ fontFamily: "sans-serif", color: "white" }}>
          <div className="col-12">
            <p className="copyright"><small>Copyright &copy; {currentYear} All rights reserved.</small></p>

          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;