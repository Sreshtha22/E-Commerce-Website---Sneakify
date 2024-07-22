import React from "react";

const TermsView = () => {
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
            <h1 className="display-6 text-center">Terms Of Use</h1>
          </div>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="txt_clr" style = {{textAlign : "justify"}}>
                Welcome to our Sneakify website! These Terms of Use govern your use of the
                Sneakify website and all services offered by Sneakify.
                Accessing or browsing this website or any of its services indicates
                your agreement to these Terms of Use. If you do not agree to these
                Terms of Use, please do not use our website or services.
              </p>
              <p style = {{textAlign : "justify"}}>
                Throughout the website, words "You", "User", and "Customer" refer to
                any person who has agreed to access or browse the website. The
                terms "Us", "Our", and "We" refer to Sneakify, the owner of
                this website.
              </p>
              <p style = {{textAlign : "justify"}}>
                Sneakify reserves the right to modify, change, add, or remove
                any portion of these Terms of Use at any time without prior notice.
                Users are requested to periodically check the Terms of Use as even
                after changes if you are using our website it will be considered
                that you have accepted or agreed with the revisions.
              </p>
              <p style = {{textAlign : "justify"}}>
                The images, content, user interface, and information of this
                website are protected by patent, copyright, and intellectual
                property rights, hence cannot be copied partially or completely.
              </p>
              <p style = {{textAlign : "justify"}}>
                Sneakify website can be browsed by all but for buying the
                product, registration is mandatory. All the activities and
                information of our website account are the responsibility of its
                user. We request you all to maintain confidentiality of your
                account information.
              </p>
              <p style = {{textAlign : "justify"}}>
                All the transactions and the Terms of Use of this Website shall be
                governed by the Indian Laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TermsView;