import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import "./viewProfile.css";

const ViewProfile = () => {
  const [emailInput, setEmailInput] = useState(""); // State to hold email input
  const [profile, setProfile] = useState(null); // State to store fetched profile data
  const [error, setError] = useState(""); // State to store any error messages
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setError(""); // Reset error message on new input
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) {
      setError("Please enter an email.");
      return;
    }

    setIsLoading(true);
    fetch(`https://my-elegant-node-mongodb-api.onrender.com/api/profile/${emailInput}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.email) {
          setProfile(data); // Set profile data if found
          setError(""); // Reset error
        } else {
          setError("No profile found for this email.");
          setProfile(null); // Clear profile if no data
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching profile. Please try again later.");
        setIsLoading(false);
      });
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>

      {/* Email input form */}
      {!profile ? (
        <div className="email-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              value={emailInput}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Fetch Profile"}
            </button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="profile-box">
          {/* Display profile data */}
          <div className="profile-detail">
            <div className="label">Full Name:</div>
            <div className="value">{profile.fullName}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Email:</div>
            <div className="value">{profile.email}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Phone:</div>
            <div className="value">{profile.phone}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Work Experience:</div>
            <div className="value">{profile.workExperience}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Professional Summary:</div>
            <div className="value">{profile.professionalSummary}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Skills:</div>
            <div className="value">{profile.skill}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Achievements:</div>
            <div className="value">{profile.achievements}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Certifications:</div>
            <div className="value">{profile.certifications}</div>
          </div>
          <div className="profile-detail">
            <div className="label">Education:</div>
            <div className="education">
              <div className="education-item">
                <h3>Tenth</h3>
                <p>{profile.education.tenth}%</p>
              </div>
              <div className="education-item">
                <h3>Inter</h3>
                <p>{profile.education.inter}%</p>
              </div>
              <div className="education-item">
                <h3>Graduate</h3>
                <p>{profile.education.graduate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
