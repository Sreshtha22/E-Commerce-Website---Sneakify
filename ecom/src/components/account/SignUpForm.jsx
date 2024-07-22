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
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
  maxLength50,
  passwordPattern
} from "../../helpers/validation";
import { signupCust } from "../../api.js";
const initialValues = {
  name: '',
  phno: '',
  email: '',
  password: '',
  sqstn: '',
  ans: ''
}
const SignUpForm = (props) => {
  const [cust, setCust] = useState(initialValues)
  const [isError, setIsError] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const onValueChange = (e) => {
    setCust({ ...cust, [e.target.name]: e.target.value })
    console.log(cust)
  }
  const addCustDetails = async () => {
    const allFieldsFilled = Object.values(cust).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      return;
    }
    try {
      await signupCust(cust);
      setIsSignedUp(true);
      setIsError(false);
      setIsEmailExists(false);
      setTimeout(() => {
        setIsSignedUp(false);
        setCust(prevState => ({ ...prevState, sqstn: '' }));
        props.reset();
      }, 2000);
    } catch (error) {
      setIsSignedUp(false);
      if (error.message === 'Email already exists') {
        setIsEmailExists(true);
        setTimeout(() => {
          setIsEmailExists(false);
          setCust(prevState => ({ ...prevState, sqstn: '' }));
          props.reset();
        }, 2000);
      } else {
        setIsError(true);
        setIsEmailExists(false);
        setTimeout(() => {
          setIsError(false);
          setCust(prevState => ({ ...prevState, sqstn: '' }));
          props.reset();
        }, 2000);
      }
    }
  };
  const { handleSubmit, submitting, submitFailed } = props;
  return (
    <div>
      <form
        onSubmit={handleSubmit(addCustDetails)}
        className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
        noValidate>
        <div className="row mb-3">
          <div className="col-md-12">
            <Field
              name="name"
              type="text"
              label="Name"
              title="Please enter your name"
              component={renderFormField}
              placeholder="Enter full name"
              validate={[required, name]}
              required={true}
              onChange={(e) => onValueChange(e)}/>
          </div>
        </div>
        <Field
          name="phno"
          label="Mobile No."
          type="tel"
          pattern="^[0-9]{10,10}$"
          title="Please enter your valid mobile number"
          component={renderFormGroupField}
          placeholder="Enter mobile no. without country code"
          validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
          required={true}
          max="9999999999"
          min="9999999999"
          className="mb-3"
          onChange={(e) => onValueChange(e)}/>
        <Field
          name="email"
          label="Email"
          type="email"
          title="Please enter your valid email address"
          component={renderFormGroupField}
          placeholder="Enter valid email address"
          validate={[required, maxLength50, email]}
          required={true}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
          className="mb-3"
          onChange={(e) => onValueChange(e)}/>
        <Field
          name="password"
          type="password"
          label="Password"
          title="Please enter a valid password"
          component={renderFormGroupField}
          placeholder="Enter strong password"
          validate={[required, maxLength20, minLength8, passwordPattern]}
          required={true}
          maxLength="20"
          minLength="8"
          className="mb-3"
          onChange={(e) => onValueChange(e)}/>
        <div className="form-group">
          <label className="text-black form-label" style={{ fontSize: '15px', marginLeft: '5px' }}>Security Question</label>
          <select
            className="form-control"
            name="sqstn"
            required={true}
            style={{ marginBottom: '10px' }}
            onChange={(e) => onValueChange(e)}>
            <option value="">Select</option>
            <option value="childhoodFriend">What was the name of your childhood friend?</option>
            <option value="firstCar">What was the name of your first car?</option>
            <option value="favoriteFood">What is your favourite food?</option>
          </select>
        </div>
        <div className="form-group">
          <Field
            name="ans"
            type="text"
            label="Answer"
            title="Write your Security Answer"
            component={renderFormField}
            placeholder="Write your security answer"
            required={true}
            onChange={(e) => onValueChange(e)}/>
        </div>
        <br />
        {isError && <h6 className="text-center text-danger">Failed to Sign Up!</h6>}
        {isEmailExists && <h6 className="text-center">Email already exists! Please use a different email.</h6>}
        {isSignedUp && <h6 className="text-center text-success">Successfully Signed Up!</h6>}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-dark mb-3"
            disabled={submitting}
            style={{ background: "black", borderColor: "black" }}
            onClick={() => addCustDetails()}>
            Create
          </button>
        </div>
        <Link className="float-start" to="/account/signin" title="Sign In" style={{ color: "black", marginLeft: "190px" }}>
          <p>Have an account?</p>
        </Link>
      </form>
    </div>
  );
};
export default compose(
  reduxForm({
    form: "signup",
    initialValues
  })
)(SignUpForm);