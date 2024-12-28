import React, { useState } from "react";
import "./port.module.css";

function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: null,
    message: "",
    position: "real-estate-agent",
    achievements: "",
    certifications: "",
    experience: "",
    education: "",
  });

  const [isPortfolioUploaded, setIsPortfolioUploaded] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setIsPortfolioUploaded(true);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send formData to an API)
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container">
      <h1>Real Estate Job Portal</h1>
      <p className="intro-text">
        Submit your portfolio or manually enter your details for the job
        application.
      </p>

      <form onSubmit={handleSubmit} id="job-form">
        {/* Portfolio Upload Section */}
        <div className="form-group">
          <label htmlFor="portfolio-upload">Upload Portfolio</label>
          <input
            type="file"
            id="portfolio-upload"
            name="portfolio"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

        {/* If portfolio uploaded, other fields become optional */}
        {isPortfolioUploaded ? (
          <p>Your portfolio is uploaded. Feel free to submit the form.</p>
        ) : (
          <>
            {/* Manual Entry Fields if no portfolio uploaded */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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

            {/* Educational Details Section */}
            <div className="form-group">
              <label htmlFor="education">Education (Optional)</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="List your educational qualifications"
                rows="4"
              ></textarea>
            </div>

            {/* Other Optional Fields */}
            <div className="form-group">
              <label htmlFor="achievements">Achievements (Optional)</label>
              <textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="List your achievements"
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="certifications">Certifications (Optional)</label>
              <textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="List your certifications"
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience (Optional)</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Describe your work experience"
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="message">Write a Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write a short message"
                rows="4"
              ></textarea>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <select
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          >
            <option value="head-of-sales">Head of Sales</option>
            <option value="channel-partner">Channel Partner</option>
            <option value="sales-executives">Sales Executives</option>
            <option value="hr-operations">HR & Operations</option>
            <option value="ceo-directors">C.E.O/Directors</option>
            <option value="marketing">Marketing</option>
            <option value="digital">Digital</option>
            <option value="accounts">Accounts</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Portfolio;
