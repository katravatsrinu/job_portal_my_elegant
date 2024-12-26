import React, { useState } from "react";
import styles from "../auth/styles/companylogin.module.css";

const CompanyLoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{isLogin ? "Company Login" : "Company Register"}</h2>
        {isLogin ? (
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className={styles.btn}>Login</button>
          </form>
        ) : (
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input type="text" id="companyName" placeholder="Enter your company name" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="gstNumber">GST Number</label>
              <input type="text" id="gstNumber" placeholder="Enter your GST number" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="incorporationCert">Business Incorporation Certificate</label>
              <input type="text" id="incorporationCert" placeholder="Enter incorporation certificate details" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="panNumber">Company PAN Number</label>
              <input type="text" id="panNumber" placeholder="Enter your company PAN number" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="uniqueIdentifier">Unique Company Identifier</label>
              <input type="text" id="uniqueIdentifier" placeholder="Enter unique identifier" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className={styles.btn}>Register</button>
          </form>
        )}
        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <span onClick={toggleForm} className={styles.toggleLink}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CompanyLoginRegister;