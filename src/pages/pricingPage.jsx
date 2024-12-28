import React from "react";
import "./pricingPage.css";

const PricingPage = () => {
  const plans = [
    {
      tier: "Basic",
      price: 99,
      features: [
        "Post 1 job listing",
        "Basic company profile",
        "Email support",
        "30-day listing duration",
        "Basic analytics",
      ],
    },
    {
      tier: "Standard",
      price: 499,
      features: [
        "Post up to 5 job listings",
        "Enhanced company profile",
        "Priority email support",
        "60-day listing duration",
        "Advanced analytics",
        "Featured listings",
      ],
      isPopular: true,
    },
    {
      tier: "Pro",
      price: 999,
      features: [
        "Unlimited job listings",
        "Premium company profile",
        "24/7 priority support",
        "90-day listing duration",
        "Full analytics suite",
        "Access to all user profiles",
        "Featured listings",
        "Custom branding",
      ],
    },
  ];

  return (
    <div className="pricing-container container py-5">
      <h1 className="text-center mb-5">Choose Your Plan</h1>
      <div className="row justify-content-center">
        {plans.map((plan, index) => (
          <div
            className={`col-lg-4 col-md-6 mb-4 ${
              plan.isPopular ? "most-popular" : ""
            }`}
            key={index}
          >
            <div className="card plan-card h-100">
              <div className="card-body d-flex flex-column">
                {plan.isPopular && (
                  <span className="popular-badge">Most Popular</span>
                )}
                <h4 className="card-title text-center">{plan.tier}</h4>
                <p className="price text-center">₹{plan.price}/month</p>
                <ul className="features list-unstyled flex-grow-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <button className="pricing-btn mt-3">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
