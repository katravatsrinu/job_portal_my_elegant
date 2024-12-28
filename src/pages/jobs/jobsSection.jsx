import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To read query parameters
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

const FilteredJobs = () => {
  const [jobs, setJobs] = useState([]); // State for storing filtered jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [myLocation, setMyLocation] = useState({ lat: 0, lon: 0 }); // User's location
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
        .get(`https://my-elegant-node-mongodb-api.onrender.com/api/job/filter?skill=${skill}`)
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
      return "blue"; // Perfect Match
    } else if (distance <= 30) {
      return "yellow"; // Close Match
    } else {
      return "red"; // Partial Match
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h1 className="text-center py-5">Filtered Jobs</h1>

      <Row className="g-4">
        {jobs.map((job, index) => {
          // Extract job location
          const { latitude, longitude } = job.JobLocation || {};
          if (!latitude || !longitude) return null; // Skip job if no location

          // Calculate the distance between user's location and job location
          const distance = haversine(myLocation.lat, myLocation.lon, latitude, longitude);

          // Debug: Log the distance and corresponding color
          console.log(`Job: ${job.JobTitle}, Distance: ${distance} km, Color: ${classifyDistance(distance)}`);

          const color = classifyDistance(distance); // Get color based on distance

          return (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="job-card h-100">
                <Card.Body>
                  <Card.Text>
                    <strong>Company:</strong> <strong>{job.CompanyName}</strong>
                  </Card.Text>
                  <Card.Title>{job.JobTitle}</Card.Title>
                  <Card.Text>
                    <strong>Job Description:</strong> {job.JobDescription}
                  </Card.Text>
                  <Card.Text>
                    <strong>Required Qualifications:</strong> {job.RequiredQualifications}
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

                  {/* Apply Button */}
                  <Button variant="primary" href={`mailto:careers@companyxyz.com?subject=Application for ${job.JobTitle}`}>
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
