import { Link } from "react-router-dom";
const handleLogout = () => {
  localStorage.removeItem("value");
};
const AdminDashView = () => {
    return (
        <div>
            <div className="bg-secondary border-top p-3 p-md-5 text-white mb-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <Link to="/">
                                <img alt="logo" src="../../images/(0).png" style={{ height: "44px", width: "159px" }} />
                            </Link>
                        </div>
                        <div className="col-md-6 text-center">
                            <h1 className="display-6">Admin Dashboard</h1>
                        </div>
                        <div className="col-md-3 text-end">
                            <Link to="/account/signinadmin" className="text-white" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                            <button className="btn btn-dark" onClick={handleLogout}>  Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="">
            <Link to="/account/addproduct" className="text-white" style={{color : "white", textDecoration : "none", fontSize : "22px"}}>
              <button className="btn btn-dark btn-block" style={{width : "416px", height : "45px", fontSize : "24px"}}>
                  ADD PRODUCTS
              </button></Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="">
            <Link to="/account/manageorder" className="text-white" style={{color : "white", textDecoration : "none", fontSize : "22px"}}>
              <button className="btn btn-dark btn-block" style={{width : "416px", height : "45px", fontSize : "24px"}}>
                  MANAGE ORDERS
              </button></Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="">
            <Link to="/account/returnorder" className="text-white" style={{color : "white", textDecoration : "none", fontSize : "22px"}}>
              <button className="btn btn-dark btn-block" style={{width : "416px", height : "45px", fontSize : "24px"}}>
                  RETURN ORDERS
              </button></Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="">
            <Link to="/account/showproduct" className="text-white" style={{color : "white", textDecoration : "none", fontSize : "22px"}}>
              <button className="btn btn-dark btn-block" style={{width : "416px", height : "45px", fontSize : "24px"}}>
                  SHOW PRODUCTS
              </button></Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="" >
            <Link to="/account/admincontactus" className="text-white" style={{color : "white", textDecoration : "none", fontSize : "22px"}}>
              <button className="btn btn-dark btn-block" style={{width : "416px", height : "45px", fontSize : "24px"}}>
                  SOLVE QUERIES
              </button></Link>
            </div>
          </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashView;