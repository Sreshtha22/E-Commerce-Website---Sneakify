import React, { lazy, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchContacts, updateQueryStatus } from "../../api.js";
const Breadcrumb = lazy(() => import("../../components/Breadcrumb4"));

function QueryList() {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const contacts = await fetchContacts();
            setQueries(contacts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUpdate = async (queryId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'yes' ? 'no' : 'yes';
            await updateQueryStatus(queryId, newStatus);
            setQueries(prevQueries => {
                return prevQueries.map(query => {
                    if (query.id === queryId) {
                        return { ...query, ans: newStatus };
                    }
                    return query;
                });
            });
        } catch (error) {
            console.error('Error updating data:', error);
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
                            <h1 className="display-6">Query List</h1>
                        </div>
                        <div className="col-md-3 text-end">
                            <Link to="/account/signinadmin" className="text-white" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                                <button className="btn btn-dark" onClick={handleLogout}> Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "-16px", display: "flex"}}><Breadcrumb /><span style={{marginTop: "9px", marginLeft: "-10px"}}>/ Query List</span></div>
            
            <div style={{ padding: "40px" }}>
                <div className="table-responsive" >
                    <table className="table table-striped table-bordered table-hover table-condensed color-white" style={{ backgroundColor: "black", width: "100%", align: "center" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "black", color: "white" }}><center>Query No.</center></th>
                                <th style={{ backgroundColor: "black", color: "white" }}><center>Email</center></th>
                                <th style={{ backgroundColor: "black", color: "white" }}><center>Mobile No.</center></th>
                                <th style={{ backgroundColor: "black", color: "white" }}><center>Message</center></th>
                                <th style={{ backgroundColor: "black", color: "white" }}><center>Is_Answered</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map(query => (
                                <tr key={query.id}>
                                    <td><center>{query.id}</center></td>
                                    <td><center>{query.email}</center></td>
                                    <td><center>{query.phno}</center></td>
                                    <td><center>{query.msg}</center></td>
                                    <td><center>{query.ans}
                                        <input 
                                            type="button" 
                                            value="Update" 
                                            className="btn btn-md text-white" 
                                            style={{ marginLeft: '30px', backgroundColor: 'black' }} 
                                            onClick={() => handleUpdate(query.id, query.ans)}
                                        />
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default QueryList;
