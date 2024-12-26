import React, { useState } from "react";
import styles from "../auth/styles/userlogin.module.css"

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
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
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder="Enter your phone number" />
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

export default LoginRegister;
