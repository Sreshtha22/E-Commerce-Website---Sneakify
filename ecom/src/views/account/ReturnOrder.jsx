import React, { lazy, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchReturnData, updateReturnStatus } from "../../api.js";
const Breadcrumb = lazy(() => import("../../components/Breadcrumb4"));
function ReturnList() {
  const [rtrns, setRtrns] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const returnItems = await fetchReturnData();
      setRtrns(returnItems);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const updateStatus = async (orderId, returnId, newStatus) => {
    try {
      const response = await updateReturnStatus(orderId, returnId, newStatus);
      console.log("Response:", response);
      fetchData();
    } catch (error) {
      console.error('Error updating shipping status: ', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("value");
  };
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
              <h1 className="display-6">Return Orders</h1>
            </div>
            <div className="col-md-3 text-end">
              <Link to="/account/signinadmin" className="text-white" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                <button className="btn btn-dark" onClick={handleLogout}> Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "-16px", display: "flex" }}><Breadcrumb /><span style={{ marginTop: "9px", marginLeft: "-10px" }}>/ Return Orders</span></div>
      <div style={{ padding: "40px" }}>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-condensed" width="80%" align="center">
            <thead>
              <tr>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Order ID</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Order Date</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Return Date</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Name</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Product Price</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Shipping Address</center></th>
                <th style={{ backgroundColor: "black", color: "white" }}><center>Return Status</center></th>
              </tr>
            </thead>
            {rtrns && rtrns.length > 0 ? (
              <tbody>
                {rtrns.map(rtrn => (
                  <tr key={rtrn.id}>
                    <td><center>{rtrn.orderId}</center></td>
                    <td><center>{rtrn.orderDate}</center></td>
                    <td><center>{rtrn.date}</center></td>
                    <td><center>{rtrn.productName}</center></td>
                    <td><center>{rtrn.price}</center></td>
                    <td><center>{rtrn.address1}<br />Alternative Address - {rtrn.address2}<br />City-{rtrn.city}<br />Zip-{rtrn.zip}<br />Landmark-{rtrn.landmark}</center></td>
                    <td>
                      <center>
                        <h6>{rtrn.status}</h6>
                        <button onClick={() => updateStatus(rtrn.orderId, rtrn.id, "Return Confirmed")} className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', margin: '10px', borderColor: 'black' }} disabled={rtrn.status==="Return Confirmed" || rtrn.status==="Picked Up" || rtrn.status==="Refund Completed"}>Return Confirmed</button>
                        <button onClick={() => updateStatus(rtrn.orderId, rtrn.id, "Picked Up")} className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', marginRight: '10px', borderColor: 'black' }} disabled={rtrn.status==="Picked Up" || rtrn.status==="Refund Completed"}>Pickup</button>
                        <button onClick={() => updateStatus(rtrn.orderId, rtrn.id, "Refund Completed")} className="btn btn-primary btn-md text-white" style={{ backgroundColor: 'black', marginRight: '10px', borderColor: 'black' }} disabled={ rtrn.status==="Refund Completed"}>Refund Completed</button>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </div>
  );
}
export default ReturnList;