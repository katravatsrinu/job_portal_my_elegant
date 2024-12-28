import React from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { jobSlug } = useParams();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Job Details</h1>
      <p>You are viewing details for the job: <strong>{jobSlug.replace(/-/g, " ")}</strong></p>
    </div>
  );
};

export default JobDetail;
