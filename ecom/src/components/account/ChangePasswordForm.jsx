import React, { useState } from 'react';
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength20, minLength8 } from "../../helpers/validation";
import { changePassword } from "../../api.js";
const ChangePasswordForm = (props) => {
  const { submitting, submitFailed } = props;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const allFieldsFilled = currentPassword.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';
    if (!allFieldsFilled) {
      setError("All fields are required!");
      setSuccess(false);
      setTimeout(() => {
        setError(false);
        props.reset();
      }, 2000);
      return;
    }else if ((password.length < 8 || password.length > 20) || (confirmPassword.length < 8 || confirmPassword.length > 20)){
      setError("Passwords must be of 8-20 characters!");
      setSuccess(false);
      setTimeout(() => {
        setError(false);
        props.reset();
      }, 2000);
    } 
    else if (password !== confirmPassword) {
      setError("Password doesn't match!");
      setSuccess(false);
      setTimeout(() => {
        setError(false);
        props.reset();
      }, 2000);
    } else {
      try {
        const userData = localStorage.getItem('data');
        const response = await changePassword(userData, currentPassword, password);
        console.log("Response : ", response);
        setSuccess("Password updated successfully!");
        setError(false);
        setTimeout(() => {
          setSuccess(false);
          props.reset();
        }, 2000);
      } catch (error) {
        console.error('Error changing password:', error);
        if (error.response && error.response.status === 401) {
          setError('Invalid current password!');
        }else{
        setError('Failed to update password!');
        }
        setSuccess(false);
        setTimeout(() => {
          setError(false);
          props.reset();
        }, 2000);
      }
    }
  };

  return (
    <div className="card" style={{ height: "390px", borderColor: "black", marginTop: "12px" }}>
      <h5 className="card-header text-white" style={{ backgroundColor: "black", paddingTop: "10px", height: "44px" }}>
        <i className="bi bi-key text-white"></i> &nbsp; Change Password
      </h5>
      <div className="card-body">
        <form
          onSubmit={handleSubmit}
          className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
          noValidate
        >
          <Field
            name="currentPassword"
            type="password"
            label="Current Password"
            component={renderFormGroupField}
            placeholder="Enter your current password"
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
          <Field
            name="password"
            type="password"
            label="New Password"
            component={renderFormGroupField}
            placeholder="Enter new password "
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
          <Field
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            component={renderFormGroupField}
            placeholder="Confirm new password"
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
          <div className="card-body d-flex" style={{ paddingLeft: "2px", paddingTop: "13px" }} >
            <button
              type="submit"
              className="btn btn-primary  d-flex"
              disabled={submitting}
              style={{ background: "black", borderColor: "black", marginRight: "15px" }}
            >
              Save
            </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {error && <h6 className="text-center text-danger">{error}</h6>}
            {success && <h6 className="text-center text-success">{success}</h6>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default compose(
  reduxForm({
    form: "changepassword",
  })
)(ChangePasswordForm);