import { lazy } from "react";
import { Link } from "react-router-dom";
const SignInAdminForm = lazy(() => import("../../components/account/SignInAdminForm"));
const SignInAdminView = () => {
    const onSubmit = async (values) => {
        alert(JSON.stringify(values));
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
                            <h1 className="display-6">Admin Sign In</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-sm-12">
                        <div className="p-3 border" style={{ marginTop: '50px' }}>
                            <SignInAdminForm onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignInAdminView;