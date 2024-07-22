import { lazy } from "react";

const SignUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          <div className="p-3 border" style={{ marginTop: '50px', height: "710px", overflowY: "auto" }}>
            <h3 className="text-center" style={{ marginTop: '20px'}}>SIGN UP</h3>
            <SignUpForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
