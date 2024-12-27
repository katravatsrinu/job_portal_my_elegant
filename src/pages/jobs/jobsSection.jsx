import React, { useState, useEffect } from "react";
import "./jobsSection.module.css";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]); // Holds all jobs data
  const [selectedJob, setSelectedJob] = useState(null); // Holds selected job details

  // Fetch job data from API
  useEffect(() => {
    fetch("https://my-elegant-node-mongodb-api.onrender.com/api/job-posts")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
        
          setJobs(data); // Update state with fetched jobs
        } else {
          console.error("Invalid data format received from API", data);
        }
      })
      .catch((error) => console.error("Error fetching job data:", error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Job Cards */}
        <div className="col-md-4">
          <h5>All Jobs</h5>
          <div className="job-list">
            {jobs.map((job, index) => (
              <div
                key={index}
                className={`job-card ${selectedJob === job ? "active" : ""}`}
                onClick={() => setSelectedJob(job)}
              >
                <h6>{job.JobTitle || "No Title Provided"}</h6>
                <p>
                  <strong>Company:</strong> {job.CompanyName || "Unknown Company"}
                </p>
                <p>
                  <strong>Experience:</strong>{" "}
                  {job.ExperienceLevel ? `${job.ExperienceLevel} Years` : "Not Specified"}
                </p>
                {/* <p>
                  <strong>Location:</strong>{" "}
                  {(job.location && job.location.join(", ")) || "Not Mentioned"}
                </p> */}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Selected Job Details */}
        <div className="col-md-8">
          <h5>Job Details</h5>
      
          {selectedJob ? (
            <div className="job-details glassy-card">
              <h6>{selectedJob.JobTitle || "No Title Provided"}</h6>
              <p>
                <strong>Company:</strong> {selectedJob.CompanyName || "Unknown Company"}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {selectedJob.ExperienceLevel ? `${selectedJob.ExperienceLevel} Years` : "Not Specified"}
              </p>
              {/* <p>
                <strong>Location:</strong>{" "}
                {(selectedJob.location && selectedJob.location.join(", ")) || "Not Mentioned"}
              </p> */}
              <p>
                <strong>Skills:</strong>{" "}
                {(selectedJob.Skill && selectedJob.Skill) || "Not Specified"}
              </p>
              <p>
                <strong>Job Description:</strong> {selectedJob.JobDescription|| "No Description"}
              </p>
            </div>
          ) : (
            <p>Please select a job to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
