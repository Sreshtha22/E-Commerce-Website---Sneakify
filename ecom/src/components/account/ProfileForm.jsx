import React, { useState, useEffect } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { getCustomerData, update } from "../../api.js";
const ProfileForm = (props) => {
  const {
    submitting,
    submitFailed,
  } = props;
  const [customerData, setCustomerData] = useState({
    email: "",
    phno: "",
    name: ""
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = localStorage.getItem('data');
      const customerInfo = await getCustomerData(userData);
      console.log("Customer Data : ", customerInfo);
      setCustomerData(customerInfo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, phno } = customerData;

    const allFieldsFilled = email.trim() !== '' && name.trim() !== '' && phno.trim() !== '';
    if (!allFieldsFilled) {
      return;
    } else {
      try {
        const response = await update(email, name, phno);
        console.log("Response : ", response);
        setSuccess("Profile updated successfully!");
        setError(false);
        setTimeout(() => {
          setSuccess(false);
          fetchData();
        }, 2000);
      } catch (error) {
        console.error('Error updating profile:', error);
        if (error.response && error.response.status === 404) {
          setError('Email not found!');
        } else {
          setError('Failed to update profile!');
        }
        setSuccess(false);
        setTimeout(() => {
          setError(false);
          fetchData();
        }, 2000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card" style={{ paddingBottom: "5px", borderColor: "black" }}>
        <h5 className="card-header text-white" style={{ backgroundColor: "black" }}>
          <i className="bi bi-person-lines-fill" /> &nbsp;Profile Detail
        </h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" >
            <label htmlFor="email" style={{ marginLeft: '2px', marginBottom: '10px' }}>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Registered email address"
              aria-label="Email Address"
              value={customerData.email}
              required
              disabled
            />
          </li>
          <li className="list-group-item" >
            <label htmlFor="name" style={{ marginLeft: '2px', marginBottom: '10px' }}>Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={customerData.name}
              onChange={handleChange}
              required
            />
          </li>
          <li className="list-group-item" >
            <label htmlFor="mobile" style={{ marginLeft: '2px', marginBottom: '10px' }}>Mobile No.:</label>
            <input
              type="tel"
              name="phno"
              className="form-control"
              placeholder="Mobile no. without country code"
              value={customerData.phno}
              onChange={handleChange}
              pattern="^[0-9]{10}$"
              required
            />
          </li>
        </ul>
        {error && <h6 className="text-center text-danger">{error}</h6>}
        {success && <h6 className="text-center text-success">{success}</h6>}
        <div className="card-body" style={{ marginTop: '12px' }}>
          <button
            type="submit"
            className="btn btn-primary  d-flex"
            disabled={submitting}
            style={{ background: "black", borderColor: "black" }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default compose(
  reduxForm({
    form: "profile",
  })
)(ProfileForm);