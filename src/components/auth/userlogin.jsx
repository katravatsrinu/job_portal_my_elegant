import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./styles/userlogin.module.css";




const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for login or register
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug: Check what data we're sending to the API
    console.log("Form Data being submitted:", formData);

    if (isLogin) {
      // Handle Login
      const { username, password } = formData;
      try {
        const response = await axios.post(
          "https://my-elegant-node-mongodb-api.onrender.com/api/applicant/login",
          { username, password }
        );

        if (response.status === 200) {
          // Assuming the response contains a token or user info
          const { token } = response.data;
          localStorage.setItem("token", token); // Store token in localStorage
          navigate("/landing"); // Redirect to landing page after login
        }
      } catch (error) {
        // Handle errors here
        console.error("Login error:", error.response);
        setErrorMessage(error.response?.data?.message || "Invalid username or password. Please try again.");
      }
    } else {
      // Handle Registration
      const { username, password, confirmPassword, email, phone } = formData;

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      try {
        // Debug: Log the data being sent
        console.log("Registering with data:", formData);

        const response = await axios.post(
          "https://my-elegant-node-mongodb-api.onrender.com/api/applicant/register",
          {
            username,
            password,
            email,
            phone,
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Registered successfully! You can now log in.");
          setFormData({
            username: "",
            password: "",
            email: "",
            phone: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        // Handle errors here
        console.log("Registration error:", error.response);
        setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
      }
    }
  };

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(""); // Reset error message on form switch
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {/* Display success or error messages */}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        {isLogin ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className={styles.btn}>Login</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className={styles.btn}>Register</button>
          </form>
        )}

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

export default LoginRegister;
