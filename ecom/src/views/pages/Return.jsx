import { lazy } from "react";
import { Link } from "react-router-dom";
const ReturnView = () => {
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6 text-center">Cancellation and Return Policy</h1>
      </div>
      <div className="container mb-3">
        <div>
          <div className="page-heading header-text">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="mb-4 text-center">Cancellation Policy</h2>
                  <p className="txt_clr">The customer can choose to cancel an order any time before it's dispatched. The order cannot be canceled once it’s shipped. However, the customer may choose to reject it at the doorstep.
                    <br></br><br />
                    The time window for cancellation varies based on different categories and the order cannot be canceled once the specified time has passed.
                    <br /><br />
                    In some cases, the customer may not be allowed to cancel the order for free, post the specified time and a cancellation fee will be charged. The details about the time window mentioned on the product page or order confirmation page will be considered final.
                    <br /><br />
                    In case of any cancellation from the seller due to unforeseen circumstances, a full refund will be initiated for prepaid orders.
                    <br /><br />
                    Sneakify reserves the right to accept the cancellation of any order. Sneakify also reserves the right to waive off or modify the time window or cancellation fee from time to time.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="more-info about-info">
            <div className="container">
              <div className="more-info-content">
                <div className="right-content">
                  <br />
                  <h2 className="mb-4 text-center">Return Policy</h2>
                  <p className="txt_clr">Most items purchased from Sneakify are returnable within the return window, except those that are explicitly identified as not returnable.
                    For the products that are returned by the customer, the refund is issued to the original payment method (in case of pre-paid transactions) or by <b>Cheque</b> or <b>Demand Draft</b> (in case of Pay on Delivery orders), the details for making such refund and the timelines are detailed in the return policy available below.</p>
                  <br />
                  <h5 className="txt_clr">1. General Return Policy</h5>
                  <p className="txt_clr">Products are returnable within the applicable return window(7 days) if you've received them in a condition that is physically damaged, has missing parts or accessories, defective or different from their description on the product detail page on Sneakify Website.</p>
                  <br />
                  <h5 className="txt_clr">2. Returns Pick-Up</h5>
                  <p className="txt_clr">Returns Pick-Up and Processing In case of returns where you would like item(s) to be picked up from a different address, the address can only be changed if pick-up service is available at the new address During pick-up.</p>
                  <br />
                  <h5 className="txt_clr">3. Return and Refund Proccesing</h5>
                  <p className="txt_clr">Return will be processed only if:
                  </p>
                  <p className="txt_clr">3.1 It is determined that the product was not damaged while in your possession</p>
                  <p className="txt_clr">3.2 It is determined that the product was not damaged while in your possession</p>
                  <p className="txt_clr">3.3 The product is not different from what was shipped to you</p>
                  <p className="txt_clr">3.4 The product is returned in original condition (with brand’s/manufacturer's box, MRP tag intact, user manual, warranty card and all the accessories therein).</p>
                  <br />
                  <h5 className="txt_clr">4. Refund</h5>
                  <p className="txt_clr">For the products that are returned by the customer, the refund is issued to the original payment method (in case of pre-paid transactions) or by <b>Cheque</b> or <b>Demand Draft</b>  (in case of Pay on Delivery orders). The refund will be proccessed within 2-5 business days.</p>
                  <br />
                  <h5 className="txt_clr">5. Misuse of Policy</h5>
                  <p className="txt_clr">In the event customers are found to misuse the return policy by excessively returning, or cancelling or not accepting the orders placed, Sneakify reserves the right to warn and/or suspend and/or block and/or terminate such customer accounts, as necessary.</p>
                  <br />
                  <h5 className="txt_clr">6. Know More</h5>
                  <p className="txt_clr">If you want to know more about the return policy please contact us <Link to="/contact-us" style={{color : "black"}}>here</Link>.</p>
                  <br />
                  <p className="txt_clr">Thank you for using Sneakify. So go ahead, shop with confidence.</p>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReturnView;