import { Field, reduxForm } from "redux-form";
import { useState } from "react";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
} from "../../helpers/validation";
import { forgotPassword } from "../../api.js";

const ForgotPasswordForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSubmit = async (formData) => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      return;
    }
    try {
      console.log(formData);
      const response = await forgotPassword(formData.email, formData.securityQuestion, formData.answer, formData.password);
      console.log("Response : ", response);
      setSuccess("Password updated successfully!");
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        props.reset();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid security question or answer');
      }else if (error.response && error.response.status === 404) {
        setError('Invalid email address!');
      } else {
        setError('Failed to update password!');
      }
      setTimeout(() => {
        setError(false);
        props.reset();
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <Field
        name="email"
        label="Registered Email Address"
        type="email"
        title="Please enter your valid email address"
        component={renderFormGroupField}
        placeholder="Enter valid email address"
        validate={[required]}
        required={true}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        className="mb-3"
      />
      <div className="form-group">
        <label className="text-black form-label" style={{ fontSize: '15px', marginLeft: '5px' }}>Choose Your Security Question<sup style={{ color: 'red', fontSize: '14px' }}>*</sup></label>
        <Field
          name="securityQuestion"
          component="select"
          className="form-control"
          required={true}
          style={{ marginBottom: '10px' }}
        >
          <option value="">Select</option>
          <option value="childhoodFriend">What was the name of your childhood friend?</option>
          <option value="firstCar">What was the name of your first car?</option>
          <option value="favoriteFood">What is your favourite food?</option>
        </Field>
      </div>
      <div className="form-group">
        <Field
          name="answer"
          type="text"
          label="Answer"
          title="Write your Security Answer"
          component={renderFormField}
          placeholder="Write your security answer"
          required={true}
        />
      </div>
      <div className="form-group2" style={{ marginTop: '10px' }}>
        <Field
          name="password"
          type="password"
          label="New Password"
          title="Please enter a valid password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
          component={renderFormGroupField}
          placeholder="Enter strong password"
          validate={[required, maxLength20, minLength8]}
          required={true}
          maxLength="20"
          minLength="8"
          className="mb-3"
        />
      </div>
      {error && <h6 className="text-center text-danger">{error}</h6>}
      {success && <h6 className="text-center text-success">{success}</h6>}
      <div className="d-grid"><br></br>
        <button
          type="submit"
          className="btn btn-dark mb-3"
          disabled={submitting}
          style={{ background: "black", borderColor: "black", marginTop: '-10px' }}
        >
          Submit
        </button><br></br>
      </div>
      <Link className="float-start" to="/account/signup" title="Sign Up" style={{ color: "black" }}>
        <p>Create Account</p>
      </Link>
      <Link
        className="float-end"
        to="/account/signin"
        title="SignIn"
        style={{ color: "black" }}
      >
        Sign In
      </Link>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "forgotpassword",
  })
)(ForgotPasswordForm);
