import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { useNavigate } from "react-router-dom";
import { getAdminSignin } from "../../api.js";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import {
  required,
  maxLength20,
  minLength8,
} from "../../helpers/validation";
const initialValues = {
  email: '',
  password: '',
}
const SignInAdminForm = (props) => {
  const [signin, setSignin] = useState(initialValues)
  const [isError, setIsError] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();
  const usegetAdminRecord = async (email, password) => {
    try {
      const response = await getAdminSignin(email);
      if (response && response.email === email && response.password === password) {
        const responseData = response;
        setSignin(responseData); 
        localStorage.setItem("value", responseData.email);
        navigate('/account/admindash', { replace: true });
        window.location.reload();
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          props.reset();
        }, 2000);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      setIsFailed(true);
      setTimeout(() => {
        setIsFailed(false);
        props.reset();
      }, 2000);
    }
  }
  const onValueChange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value })
    console.log(signin)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    usegetAdminRecord(signin.email, signin.password);
  }

  return (
    <form
      onSubmit={handleSubmit}>
      <Field
        name="email"
        label="Email"
        type = "email"
        title="Please enter your valid email address"
        component={renderFormGroupField}
        placeholder="Enter valid email address"
        validate={[required]}
        required={true}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        className="mb-3"
        onChange={(e) => onValueChange(e)}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        title="Please enter your password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
        component={renderFormGroupField}
        placeholder="Enter your password"
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
        onChange={(e) => onValueChange(e)}
      />
       {isError && <h6 className="text-center text-danger">Invalid Email or Password!</h6>}
      {isFailed && <h6 className="text-center text-danger">Failed To Sign In!</h6>}
      <div className="d-grid"><br></br>
        <button
          type="submit"
          className="btn btn-dark mb-3"
          style={{background : "black", borderColor : "black"}}
        >
          Sign In
        </button>
      </div>
      <div className="clearfix"></div>
      <div className="row">
      </div>
    </form>
  );
};
export default compose(
  reduxForm({
    form: "signinadmin",
  })
)(SignInAdminForm);