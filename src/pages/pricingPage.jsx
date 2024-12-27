import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/pricingPage.module.css"; // Custom CSS for additional styling

const PricingPage = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Choose Your Plan</h1>
      <div className="row justify-content-center">
        {/* Base Plan */}
        <div className="col-md-4 mb-4">
          <div className="card plan-card">
            <div className="card-body">
              <h4 className="card-title text-center">Basic Plan</h4>
              <p className="price text-center">₹99</p>
              <ul className="list-unstyled">
                <li>Post 1 Job</li>
                <li>Access App</li>
              </ul>
              <button className="btn btn-primary btn-block">Choose Plan</button>
            </div>
          </div>
        </div>

        {/* Standard Plan */}
        <div className="col-md-4 mb-4">
          <div className="card plan-card">
            <div className="card-body">
              <h4 className="card-title text-center">Standard Plan</h4>
              <p className="price text-center">₹499</p>
              <ul className="list-unstyled">
                <li>Post 3 Jobs</li>
                <li>Access App</li>
                <li>View User Profiles</li>
              </ul>
              <button className="btn btn-primary btn-block">Choose Plan</button>
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="col-md-4 mb-4">
          <div className="card plan-card">
            <div className="card-body">
              <h4 className="card-title text-center">Pro Plan</h4>
              <p className="price text-center">₹999</p>
              <ul className="list-unstyled">
                <li>Post Unlimited Jobs</li>
                <li>Access App</li>
                <li>View All User Profiles</li>
                <li>Advanced Features</li>
              </ul>
              <button className="btn btn-primary btn-block">Choose Plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
