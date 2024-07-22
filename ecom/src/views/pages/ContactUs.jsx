import { lazy } from "react";
const ContactUsForm = lazy(() => import("../../components/ContactUsForm"));
const ContactUsView = () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <div style = {{borderColor : "black"}}>
    <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6 text-center">Contact Us</h1>
    </div>
    <div className="container my-3">
      <div className="row g-3"style={{marginTop:'30px'}}>
        <div className="col-md-8">
          <div className="card"style={{borderColor : "black"}}>
            <div className="card-header" style = {{backgroundColor : "black", color : "white"}}>
              <i className="bi bi-envelope"></i> Send Message
            </div>
            <div className="card-body">
              <ContactUsForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3"style={{borderColor : "black"}}>
            <div className="card-header" style = {{backgroundColor : "black", color : "white"}}>
              <i className="bi bi-building"></i> Address
            </div>
            <div className="card-body">
              <h4 className="card-title border-bottom border-dark pb-2">
                Head Office
              </h4>
              <address>
                <strong style={{fontSize: "20px"}}>Sneakify</strong>
                <br /><br/>
                <b>Building Loacated: </b>Saltlake Sector - V
                <br /><br/>
                <b>City: </b>Kolkata - 700091
                <br /><br/>
                <b>Country: </b>India
                <br/><br/>
                <b title="Email">Email Id:</b> sneakify05@gmail.com
                <br/><br/>
                <b title="Phone No.">Phone:</b> +91 9876543210
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default ContactUsView;