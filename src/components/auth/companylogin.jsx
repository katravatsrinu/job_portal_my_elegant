import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/companylogin.module.css";
import CompanyLanding from "../../pages/companylanding";


const CompanyLoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    gstNumber: "",
    certificate_number: "",
    companyPanNumber: "",
    uniqueCompanyIdentifier: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(""); // Clear any messages
    setFormData({
      companyName: "",
      gstNumber: "",
      certificate_number: "",
      companyPanNumber: "",
      uniqueCompanyIdentifier: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "https://my-elegant-node-mongodb-api.onrender.com/api/company/login"
      : "https://my-elegant-node-mongodb-api.onrender.com/api/company/register";

    const body = isLogin
      ? {
          uniqueCompanyIdentifier: formData.uniqueCompanyIdentifier,
          password: formData.password,
        }
      : {
          companyName: formData.companyName,
          gstNumber: formData.gstNumber,
          certificate_number: formData.certificate_number,
          companyPanNumber: formData.companyPanNumber,
          uniqueCompanyIdentifier: formData.uniqueCompanyIdentifier,
          password: formData.password,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(
          isLogin
            ? "Login successful! Redirecting..."
            : "Registration successful! You can now log in."
        );
        if (isLogin) navigate("/CompanyLanding"); // Redirect on successful login
        if (!isLogin) toggleForm(); // Switch to login form after successful registration
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{isLogin ? "Company Login" : "Company Register"}</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="gstNumber">GST Number</label>
                <input
                  type="text"
                  id="gstNumber"
                  placeholder="Enter your GST number"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="certificate_number">Certificate Number</label>
                <input
                  type="text"
                  id="certificate_number"
                  placeholder="Enter certificate number"
                  value={formData.certificate_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="companyPanNumber">Company PAN Number</label>
                <input
                  type="text"
                  id="companyPanNumber"
                  placeholder="Enter your company PAN number"
                  value={formData.companyPanNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="uniqueCompanyIdentifier">Unique Identifier</label>
            <input
              type="text"
              id="uniqueCompanyIdentifier"
              placeholder="Enter unique identifier"
              value={formData.uniqueCompanyIdentifier}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.btn}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm} className={styles.toggleLink}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CompanyLoginRegister;
