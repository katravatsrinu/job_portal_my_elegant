import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To read query parameters
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap"; // Added Alert component
import axios from "axios"; // Assuming you use axios for API requests

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

const FilteredJobs = () => {
  const [jobs, setJobs] = useState([]); // State for storing filtered jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [myLocation, setMyLocation] = useState({ lat: 0, lon: 0 }); // User's location
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [buttonDisabled, setButtonDisabled] = useState(false); // Button disable state
  const location = useLocation(); // To access the query parameters

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching user's location:", error)
      );
    }

    const queryParams = new URLSearchParams(location.search);
    const skill = queryParams.get("skill"); // Get the "skill" query parameter

    // Fetch jobs based on the skill query parameter
    if (skill) {
      axios
        .get(
          `https://my-elegant-node-mongodb-api.onrender.com/api/job/filter?skill=${skill}`
        )
        .then((response) => {
          setJobs(response.data); // Store job data in state
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load jobs.");
          setLoading(false);
        });
    }
  }, [location.search]);

  const classifyDistance = (distance) => {
    if (distance <= 10) {
      return "green"; // Near (within 10 km)
    } else if (distance <= 30) {
      return "yellow"; // Medium distance (10-30 km)
    } else {
      return "red"; // Far (greater than 30 km)
    }
  };

  const handleApplyClick = () => {
    setButtonDisabled(true); // Disable the button after click
    setSuccessMessage("Successfully Applied!"); // Show success message

    // Optionally, you can add a delay before resetting the button if needed.
    setTimeout(() => {
      setButtonDisabled(false); // Re-enable the button after 3 seconds (optional)
      setSuccessMessage(""); // Clear the success message
    }, 3000); // 3 seconds delay
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      style={{
        width: "100%",
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "20px", 
      }}
    >
      {/* Success Message */}
      {successMessage && (
        <Alert variant="success" className="text-center">
          {successMessage}
        </Alert>
      )}

      {/* Legend Section for Color Codes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "green",
              marginRight: "8px",
            }}
          ></div>
          <span>Perfect Match (Green)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "yellow",
              marginRight: "8px",
            }}
          ></div>
          <span>Matched (Yellow)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "red",
              marginRight: "8px",
            }}
          ></div>
          <span>Partially Matched (Red)</span>
        </div>
      </div>

      <h1 className="text-center py-5">Matching Jobs</h1>
      <Row
        style={{
          display: "flex",
          justifyContent: "center", // Center the rows
          alignItems: "stretch", // Stretch columns to match row height
        }}
        className="g-4"
      >
        {jobs.map((job, index) => {
          // Extract job location
          const { latitude, longitude } = job.JobLocation || {};
          if (!latitude || !longitude) return null; // Skip job if no location

          // Calculate the distance between user's location and job location
          const distance = haversine(
            myLocation.lat,
            myLocation.lon,
            latitude,
            longitude
          );
          const color = classifyDistance(distance); // Get color based on distance

          return (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={4}
              style={{
                display: "flex",
                justifyContent: "center", // Center each job card in the column
              }}
            >
              <Card
                className="job-card h-100"
                style={{
                  width: "100%", // Ensure the card takes up the full width
                  maxWidth: "400px", // Limit the max width of the card
                  margin: "0 auto", // Center the card
                }}
              >
                <Card.Body>
                  <Card.Title>{job.JobTitle}</Card.Title>
                  <Card.Text>
                    <strong>Company:</strong> <strong>{job.CompanyName}</strong>
                  </Card.Text>
                  {/* Proximity Indicator */}
                  <div style={{ marginTop: "10px" }}>
                    <strong>Proximity:</strong>{" "}
                    <div
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        marginLeft: "10px",
                      }}
                    ></div>
                  </div>
                  <Card.Text>
                    <strong>Job Description:</strong> {job.JobDescription}
                  </Card.Text>
                  <Card.Text>
                    <strong>Required Qualifications:</strong>{" "}
                    {job.RequiredQualifications}
                  </Card.Text>
                  <Card.Text>
                    <strong>Salary:</strong> {job.SalaryCompensation}
                  </Card.Text>
                  <Card.Text>
                    <strong>Experience Level:</strong> {job.ExperienceLevel}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {job.JobLocation.address}
                  </Card.Text>

                  <Card.Text>
                    <strong>Employment Type:</strong> {job.EmploymentType}
                  </Card.Text>
                  <Card.Text>
                    <strong>Application Deadline:</strong>{" "}
                    {new Date(job.ApplicationDeadline).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Benefits:</strong> {job.BenefitsAndPerks.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Application Instructions:</strong>{" "}
                    {job.ApplicationInstructions}
                  </Card.Text>

                  <Button
                    variant="primary"
                    disabled={buttonDisabled} // Disable button if clicked
                    onClick={handleApplyClick} // Handle click
                  >
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default FilteredJobs;
