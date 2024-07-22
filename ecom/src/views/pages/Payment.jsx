import React from 'react';
const PaymentView = () => {
  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6 text-center">Payment Policy</h1>
      </div>
      <div className="container mb-3">
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4 text-center">Payment Methods</h2>
                <p><b>Credit/Debit Cards:</b> We accept payments made using major credit and debit cards, including Visa, MasterCard, American Express, and RuPay. Your card details are encrypted and securely processed to ensure the highest level of security.</p>
                <p><b>Net Banking:</b> You can also make payments using your bank's net banking facility. We support payments from all major banks across India.</p>
                <p><b>UPI (Unified Payments Interface):</b> For a quick and hassle-free payment experience, you can use UPI-enabled apps such as Google Pay, PhonePe, Paytm, or any other UPI app of your choice.</p>
                <p><b>Wallets:</b> Sneakify accepts payments made through popular digital wallets like Paytm, Mobikwik, FreeCharge, and others. Simply choose the wallet option at checkout and complete your purchase seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4 text-center">Cash on Delivery (COD)</h2>
                <p>For customers who prefer to pay in cash, we offer a Cash on Delivery (COD) option. With COD, you can pay for your order at the time of delivery. Please note that COD orders may be subject to additional verification to ensure the security of transactions.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4 text-center">Payment Security</h2>
                <p>At Sneakify, the security of your payment information is our top priority. We utilize industry-standard encryption protocols to safeguard your personal and financial data during transmission. Additionally, we do not store your payment details on our servers after the transaction is complete, further ensuring your privacy and security.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4 text-center">Payment Confirmation</h2>
                <p>Once your payment is successfully processed, you will receive a confirmation email or SMS containing details of your order and payment. Please retain this confirmation for your records.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4 text-center">Currency and Taxes</h2>
                <p>All prices listed on Sneakify are in Indian Rupees (INR) and inclusive of applicable taxes unless otherwise stated. The final amount payable will be displayed at checkout, including any additional charges such as shipping fees, if applicable.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4 text-center">Contact Us</h2>
                <p>If you have any questions or concerns regarding our payment policy or require assistance with your payment, please don't hesitate to contact our customer support team. We're here to help you have a delightful shopping experience at Sneakify!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="text-center">Thank you for choosing Sneakify for your footwear needs. Happy shopping!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaymentView;