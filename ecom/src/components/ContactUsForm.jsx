import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import {
  renderFormGroupField,
  renderFormTextArea,
} from "../helpers/renderForm";
import {
  required,
  maxLength50,
  name,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  email,
  maxLength1000,
} from "../helpers/validation";
import { contactUs } from "../api.js";
const initialValues = {
  name: "",
  email: "",
  phno: "",
  msg: "",
};
const ContactUsForm = (props) => {
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [contact, setContact] = useState(initialValues); 
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const onValueChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    console.log(contact)
  };
  const addContact = async () => {
    const allFieldsFilled = Object.values(contact).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      return;
    }
    try {
      await contactUs(contact); 
      setIsSent(true);
      setIsError(false);
      setSuccessMessage("Successfully Sent Message!");
      setTimeout(() => {
        setSuccessMessage("");
      props.reset();
    }, 2000);
    } catch (error) {
      setIsSent(false);
      setIsError(true);
      setFailMessage("Failed to Send Message!");
      setTimeout(() => {
        setFailMessage("");
      props.reset();
    }, 2000);
    }
};
  const { handleSubmit, submitting, submitFailed } = props;
  return (
    <div>
      <form
        onSubmit={handleSubmit(addContact)}
        className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
        noValidate
      >
        <div className="row">
          <div className="col-md-12">
            <Field
              name="name"
              type="text"
              label="Name"
              title="Please enter your name"
              component={renderFormGroupField}
              placeholder="Enter full name"
              required={true}
              validate={[required, name]}
              pattern="[a-zA-Z\s]*"
              className="mb-3"
              onChange={(e) => onValueChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="phno"
              type="tel"
              label="Mobile No."
              title="Please enter your valid mobile number"
              component={renderFormGroupField}
              placeholder="Enter mobile no. without country code"
              validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
              required={true}
              pattern="^[0-9]{10,10}$"
              max="9999999999"
              min="9999999999"
              className="mb-3"
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="email"
              type="email"
              label="Email address"
              component={renderFormGroupField}
              title="Please enter your valid email address"
              placeholder="Enter email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              validate={[required, maxLength50, email]}
              required={true}
              className="mb-3"
              onChange={(e) => onValueChange(e)}
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-12">
            <Field
              name="msg"
              label="Message"
              component={renderFormTextArea}
              validate={maxLength1000}
              placeholder="What are you looking for?"
              onChange={(e) => onValueChange(e)}
            />
          </div>
        </div>
        <br></br>
        {isError && (
          <h6 className="text-center text-danger">{failMessage}</h6>
        )}
        {isSent && (
          <h6 className="text-center text-success">
            {successMessage}
          </h6>
        )}
        <div className="d-grid" style={{ marginTop: "14px" }}>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={submitting}
            style={{ backgroundColor: "black", border: "1px solid black" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default compose(
  reduxForm({
    form: "Contactus",
    initialValues,
  })
)(ContactUsForm);