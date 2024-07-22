import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.min.css";
const TopMenu = lazy(() => import("./components/TopMenu"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const SignInAdminView = lazy(() => import("./views/account/SignInAdmin"));
const AdminDashView = lazy(() => import("./views/account/AdminDash"));
const AddProductView = lazy(() => import("./views/account/AddProduct"));
const ShowProductView = lazy(() => import("./views/account/ShowProduct"));
const ManageOrderView = lazy(() => import("./views/account/ManageOrder"));
const ReturnOrderView = lazy(() => import("./views/account/ReturnOrder"));
const AdminContactUsView = lazy(() => import("./views/account/AdminContactUs"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView1 = lazy(() => import("./views/product/List1"));
const ProductListView2 = lazy(() => import("./views/product/List2"));
const ProductListView3 = lazy(() => import("./views/product/List3"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const CartView = lazy(() => import("./views/cart/Cart"));
const FailView = lazy(() => import("./views/cart/Fail"));
const SuccessView = lazy(() => import("./views/cart/Success"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const PaymentView = lazy(() => import("./views/pages/Payment"));
const PrivacyView = lazy(() => import("./views/pages/Privacy"));
const TeamView = lazy(() => import("./views/pages/Team"));
const SecurityPolicyView = lazy(() => import("./views/pages/Security"));
const ReturnView = lazy(() => import("./views/pages/Return"));
const AboutView = lazy(() => import("./views/pages/About"));
const TermsView = lazy(() => import("./views/pages/TermsOfUse"));
const FaqView = lazy(() => import("./views/pages/FAQ"));
const Search = lazy(() => import("./components/Search"));
const SearchResults = lazy(() => import("./components/SearchResults"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
        <Routes>
          <Route path="*" element={<HeaderFooterHandler />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
function HeaderFooterHandler() {
  const location = useLocation();
  const hideHeaderFooterRoutes = [
    "/account/signinadmin",
    "/account/addproduct",
    "/account/showproduct",
    "/account/admindash",
    "/account/manageorder",
    "/account/returnorder",
    "/account/admincontactus",
  ];
  if (hideHeaderFooterRoutes.includes(location.pathname)) {
    return (
      <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
        <Routes>
          <Route exact path="/account/signinadmin" element={<SignInAdminView />} />
          <Route exact path="/account/addproduct" element={<AddProductView />} />
          <Route exact path="/account/showproduct" element={<ShowProductView />} />
          <Route exact path="/account/admindash" element={<AdminDashView />} />
          <Route exact path="/account/manageorder" element={<ManageOrderView />} />
          <Route exact path="/account/returnorder" element={<ReturnOrderView />} />
          <Route exact path="/account/admincontactus" element={<AdminContactUsView />} />
        </Routes>
      </Suspense>
    );
  }
  return (
    <React.Fragment>
      <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
        <Header />
        <TopMenu />
        <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route exact path="/account/signin" element={<SignInView />} />
          <Route exact path="/account/signup" element={<SignUpView />} />
          <Route exact path="/account/forgotpassword" element={<ForgotPasswordView />} />
          <Route exact path="/account/myprofile" element={<MyProfileView />} />
          <Route exact path="/account/orders" element={<OrdersView />} />
          <Route exact path="/category-1" element={<ProductListView1 />} />
          <Route exact path="/category-2" element={<ProductListView2 />} />
          <Route exact path="/category-3" element={<ProductListView3 />} />
          <Route exact path="/product/detail/:id" element={<ProductDetailView />} />
          <Route exact path="/cart" element={<CartView />} />
          <Route exact path="/fail" element={<FailView />} />
          <Route exact path="/success" element={<SuccessView />} />
          <Route exact path="/about" element={<AboutView />} />
          <Route exact path="/terms" element={<TermsView />} />
          <Route exact path="/return" element={<ReturnView />} />
          <Route exact path="/payment" element={<PaymentView />} />
          <Route exact path="/privacy" element={<PrivacyView />} />
          <Route exact path="/security" element={<SecurityPolicyView />} />
          <Route exact path="/Team" element={<TeamView />} />
          <Route exact path="/checkout" element={<CheckoutView />} />
          <Route exact path="/contact-us" element={<ContactUsView />} />
          <Route exact path="/500" element={<InternalServerErrorView />} />
          <Route exact path="/FAQ" element={<FaqView />} />
          <Route exact path="/" element={<Search />} />
          <Route exact path="/search-results" element={<SearchResults />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
      <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
}
export default App;