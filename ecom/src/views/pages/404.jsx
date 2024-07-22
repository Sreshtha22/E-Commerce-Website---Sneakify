import { lazy } from "react";
const Search = lazy(() => import("../../components/Search"));
const NotFoundView = () => {
  return (
    <div className="container text-center p-5">
      <div className="display-1">
        <i className="bi bi-exclamation-triangle-fill text-black" />
        404
      </div>
      <h1 className="mb-3">Page Not Found!</h1>
    </div>
  );
};
export default NotFoundView;