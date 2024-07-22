import { lazy } from "react";
const ForgotPasswordForm = lazy(() =>
  import("../../components/account/ForgotPasswordForm")
);
const ForgotPasswordView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <div className="container my-3">
      <div className="row justify-content-md-center">
        <div className="col-md-5 p-3 border" style={{marginTop:'30px'}}>
          <h4 className="text-center" style={{marginTop:'10px', marginBottom:'30px'}}>FORGOT PASSWORD</h4>
          <ForgotPasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordView;