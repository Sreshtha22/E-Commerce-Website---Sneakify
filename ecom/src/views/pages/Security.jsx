import { lazy } from "react";
import { Link } from "react-router-dom";
const SecurityPolicyView = () => {
  return (
    <div>
    <div className="bg-secondary border-top p-4 text-white mb-3">
      <h1 className="display-6 text-center">Security Policy</h1>
    </div>
          <div className="more-info about-info">
            <div className="container">
              <div className="more-info-content">
                <div className="right-content">
                  <br />
                  <p className="txt_clr">At Sneakify.com, we prioritize the security of our customers' data. This Security Policy outlines the measures we have implemented to safeguard your information and ensure a secure online shopping experience.</p>
                  <br />
                  <h5 className="txt_clr">1. Data Encryption : </h5>
                  <p className="txt_clr">We utilize industry-standard encryption protocols to protect sensitive data, including personal information and payment details, during transmission over the internet.</p>
                  <br />
                  <h5 className="txt_clr">2. Secure Authentication : </h5>
                  <p className="txt_clr">Strong password requirements and two-factor authentication are enforced to prevent unauthorized access to user accounts.</p>
                  <br />
                  <h5 className="txt_clr">3. Secure Payment Processing : </h5>
                  <p className="txt_clr">Payment processing is conducted through trusted third-party payment gateways compliant with PCI DSS, and no payment information is stored on our servers.</p>
                  <br />
                  <h5 className="txt_clr">4. Regular Security Audits : </h5>
                  <p className="txt_clr">We conduct regular security audits and vulnerability assessments to identify and address potential security weaknesses, ensuring the integrity of our systems.</p>
                  <br />
                  <h5 className="txt_clr">5. Data Protection : </h5>
                  <p className="txt_clr">Personal data is handled in compliance with relevant data protection regulations, giving users control over their information and ensuring privacy.</p>
                  <br />
                  <h5 className="txt_clr">6. Employee Training : </h5>
                  <p className="txt_clr">Our employees undergo regular security awareness training to stay informed about best practices and potential threats, minimizing the risk of human error.</p>
                  <br />
                  <h5 className="txt_clr">7. Secure Development Practices : </h5>
                  <p className="txt_clr">We follow secure coding practices and conduct regular code reviews to prevent common security vulnerabilities in our website's codebase.</p>
                  <br />
                  <h5 className="txt_clr">8. Incident Response Plan : </h5>
                  <p className="txt_clr">An incident response plan is in place to effectively manage security incidents, with procedures for timely notification of affected parties and authorities.</p>
                  <br />
                  <h5 className="txt_clr">9. Physical Security Measures : </h5>
                  <p className="txt_clr">Physical access to servers and infrastructure components is restricted to authorized personnel, and data centers adhere to strict physical security standards.</p>
                  <br />
                  <h5 className="txt_clr">10. Third-Party Security Assurance : </h5>
                  <p className="txt_clr">Third-party services and vendors are carefully evaluated for their security practices and compliance with standards, with contracts including clauses for data protection.</p>
                  <br />
                  <h5 className="txt_clr">11. Know More</h5>
                  <p className="txt_clr">If you want to know more about the Security policy please contact us <Link to="/contact-us">here</Link>.</p>
                  <br />
                  <p className="txt_clr">Thank you for using Sneakify. So go ahead, shop with confidence.</p>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
export default SecurityPolicyView;