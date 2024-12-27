import React, { useState, useEffect } from "react";
import Style from "../pages/jobpost.module.css";

const Jobpost = () => {
  const [formData, setFormData] = useState({
    JobTitle: "",
    JobDescription: "",
    JobLocation: { address: "", latitude: "", longitude: "" },
    EmploymentType: "",
    SalaryCompensation: "",
    RequiredQualifications: "",
    ExperienceLevel: "",
    Skill: "",
    JobPostingDate: "",
    ApplicationDeadline: "",
    ApplicationInstructions: "",
    BenefitsAndPerks: [],
    CompanyName: "",
    CompanyDescription: "",
  });

  const [page, setPage] = useState(1);
  const [locationError, setLocationError] = useState("");

  // Fetch the current geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevState) => ({
            ...prevState,
            JobLocation: {
              ...prevState.JobLocation,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          }));
        },
        (error) => {
          setLocationError("Unable to retrieve location.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("JobLocation.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        JobLocation: {
          ...prevState.JobLocation,
          [field]: value,
        },
      }));
    } else if (name === "BenefitsAndPerks") {
      setFormData((prevState) => ({
        ...prevState,
        BenefitsAndPerks: value.split(","),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://my-elegant-node-mongodb-api.onrender.com/api/job-posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job successfully posted:", result);
        alert("Job successfully posted!");
      } else {
        const error = await response.json();
        console.error("Error posting job:", error);
        alert("Failed to post job. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const renderPage1 = () => (
    <div className={Style.pageContent}>
      <div>
        <label>Job Title:</label>
        <input
          type="text"
          name="JobTitle"
          value={formData.JobTitle}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Job Description:</label>
        <textarea
          name="JobDescription"
          value={formData.JobDescription}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Job Location Address:</label>
        <input
          type="text"
          name="JobLocation.address"
          value={formData.JobLocation.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          name="JobLocation.latitude"
          value={formData.JobLocation.latitude}
          readOnly
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          name="JobLocation.longitude"
          value={formData.JobLocation.longitude}
          readOnly
        />
      </div>
    </div>
  );

  const renderPage2 = () => (
    <div className={Style.pageContent}>
      <div>
        <label>Employment Type:</label>
        <input
          type="text"
          name="EmploymentType"
          value={formData.EmploymentType}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Salary Compensation:</label>
        <input
          type="text"
          name="SalaryCompensation"
          value={formData.SalaryCompensation}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Required Qualifications:</label>
        <input
          type="text"
          name="RequiredQualifications"
          value={formData.RequiredQualifications}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Experience Level:</label>
        <input
          type="text"
          name="ExperienceLevel"
          value={formData.ExperienceLevel}
          onChange={handleChange}
        />
      </div>
      <div>
  <label>Skill:</label>
  <select
    name="Skill"
    value={formData.Skill}
    onChange={handleChange}
  >
    <option value="">Select a skill</option>
    <option value="Head of Sales">Head of Sales</option>
    <option value="Channel Partner">Channel Partner</option>
    <option value="Sales Executives">Sales Executives</option>
    <option value="HR & Operations">HR & Operations</option>
    <option value="C.E.O/Directors">C.E.O/Directors</option>
    <option value="Marketing">Marketing</option>
    <option value="Digital">Digital</option>
    <option value="Accounts">Accounts</option>
  </select>
</div>
    </div>
  );

  const renderPage3 = () => (
    <div className={Style.pageContent}>
      <div>
        <label>Job Posting Date:</label>
        <input
          type="date"
          name="JobPostingDate"
          value={formData.JobPostingDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Application Deadline:</label>
        <input
          type="date"
          name="ApplicationDeadline"
          value={formData.ApplicationDeadline}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Application Instructions:</label>
        <textarea
          name="ApplicationInstructions"
          value={formData.ApplicationInstructions}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Benefits and Perks:</label>
        <input
          type="text"
          name="BenefitsAndPerks"
          value={formData.BenefitsAndPerks.join(", ")}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="CompanyName"
          value={formData.CompanyName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Company Description:</label>
        <textarea
          name="CompanyDescription"
          value={formData.CompanyDescription}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div>
      <h1 className={Style.title}>Post A Job</h1>
      <form onSubmit={handleSubmit} className={Style.jobForm}>
        <div className={Style.formPages}>
          {page === 1 && renderPage1()}
          {page === 2 && renderPage2()}
          {page === 3 && renderPage3()}
        </div>

        <div className={Style.navigationButtons}>
          {page > 1 && (
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              className={Style.prevButton}
            >
              Previous
            </button>
          )}
          {page < 3 && (
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              className={Style.nextButton}
            >
              Next
            </button>
          )}
          {page === 3 && (
            <button type="submit" className={Style.submitButton}>
              Submit
            </button>
          )}
        </div>
      </form>

      {locationError && <p className={Style.error}>{locationError}</p>}
    </div>
  );
};

export default Jobpost;
