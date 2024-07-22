import { lazy } from "react";
import { Link } from "react-router-dom";
const SignInForm = lazy(() => import("../../components/account/SignInForm"));
const SignInView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 col-sm-12">
          <div className="p-3 border" style={{ marginTop: '50px' }}>
            <h4 className="text-center">SIGN IN</h4>
            <SignInForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInView;