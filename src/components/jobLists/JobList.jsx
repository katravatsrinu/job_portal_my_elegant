import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './JobList.css';
import { MdOutlineSell, MdGroups, MdTrendingUp, MdOutlineCalculate, MdOutlineCorporateFare, MdPublic, MdOutlineVerifiedUser } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const JobList = () => {
  const cardsRef = useRef([]);

  const jobs = [
    {
      title: "Head of Sales",
      icon: <MdOutlineSell size={24} />, // JSX Icon
      description: "Lead and develop high-performing sales teams",
      positions: 2,
    },
    {
      title: "Channel Partners",
      icon: <MdGroups size={24} />,
      description: "Build and maintain strategic partnerships",
      positions: 5,
    },
    {
      title: "Sales Executives",
      icon: <MdTrendingUp size={24} />,
      description: "Drive property sales and client relationships",
      positions: 10,
    },
    {
      title: "HR & Operators",
      icon: <MdOutlineCalculate size={24} />,
      description: "Manage employee relations, recruitment, and organizational policies",
      positions: 7,
    },
    {
      title: "CEO/Directors",
      icon: <MdOutlineCorporateFare size={24} />,
      description: "Strategic leadership and business development",
      positions: 1,
    },
    {
      title: "Marketing",
      icon: <MdPublic size={24} />,
      description: "Create and execute marketing strategies",
      positions: 3,
    },
    {
      title: "Digital",
      icon: <MdOutlineVerifiedUser size={24} />,
      description: "Manage digital presence and online campaigns",
      positions: 4,
    },
    {
      title: "Accounts",
      icon: <MdOutlineCalculate size={24} />,
      description: "Handle financial operations and reporting",
      positions: 2,
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="job-list-section">
      <Container className="text-center py-5">
        <h1 className="section-title">Real Estate Career Opportunities</h1>
        <p className="section-subtitle">
          Join our growing team of real estate professionals
        </p>
        <Row className="g-4">
          {jobs.map((job, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={4}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Card className="job-card h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper me-3">{job.icon}</div>
                    <Card.Title className="h5 mb-0">{job.title}</Card.Title>
                  </div>
                  <Card.Text className="text-muted">{job.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                      {job.positions} position{job.positions !== 1 ? "s" : ""} available
                    </span>
                    <Button variant="outline-primary" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default JobList;
