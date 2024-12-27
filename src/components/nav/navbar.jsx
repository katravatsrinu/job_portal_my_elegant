import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form } from 'react-bootstrap';
import './Navbar.css'; // Importing the updated CSS
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg'; // Import the logo image

const NavBar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [scrollingUp, setScrollingUp] = useState(false); // Track if user is scrolling up

  const token = localStorage.getItem("token");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
      if (window.scrollY < lastScrollY) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }
    } else {
      setScrolled(false);
      setScrollingUp(false);
    }
    setLastScrollY(window.scrollY);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar py-3 ${scrolled ? (scrollingUp ? 'navbar-white' : 'navbar-scrolled') : ''}`}
      style={{ backgroundColor: scrolled ? '#f8f9fa' : '#007bff' }} // Change background color
    >
      <Container>
        {/* Logo and Website Title */}
        <Navbar.Brand href="/" className="brand-text d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo me-2" // Logo class
          />
          Real Estate Jobs.co
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link className="nav-link-custom" onClick={scrollToTop}>
              Home
            </Nav.Link>
            <Nav.Link className="nav-link-custom">
              <Link to="/Jobs" style={{ textDecoration: 'none', color: '#fff' }}>
                Jobs
              </Link>
            </Nav.Link>
            {!token && (
              <>
                <Nav.Link className="nav-link-custom">
                  <Link to="/applicantlogin" style={{ textDecoration: 'none', color: '#fff' }}>
                    Applicant Login
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-link-custom">
                  <Link to="/companylogin" style={{ textDecoration: 'none', color: '#fff' }}>
                    Become a Partner
                  </Link>
                </Nav.Link>
              </>
            )}
            <NavDropdown
              title={
                <div className="profile-dropdown">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                  ) : (
                    <div className="placeholder-icon">P</div>
                  )}
                </div>
              }
              id="nav-dropdown-profile"
              align="end"
            >
              <Form.Group controlId="formFile" className="mb-2 px-3">
                <Form.Label className="upload-label">Upload Profile Picture</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              </Form.Group>
              <NavDropdown.Item href="#profile">View Profile</NavDropdown.Item>

              <NavDropdown.Item href="#profile"><Link to="/editProfile">Edit Profile</Link></NavDropdown.Item>
              {/* <NavDropdown.Item href="#settings">Settings</NavDropdown.Item> */}
              <NavDropdown.Item
                href="#logout"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
