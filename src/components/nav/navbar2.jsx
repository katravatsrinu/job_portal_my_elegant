import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form } from 'react-bootstrap';
import './Navbar.css'; // Importing the updated CSS
import { Link } from 'react-router-dom';



const NavBar2 = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [scrollingUp, setScrollingUp] = useState(false); // Track if user is scrolling up

  const token = localStorage.getItem("token")

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Scroll event listener to toggle the scrolled class and detect scroll direction
  const handleScroll = () => {
    if (window.scrollY > 50) { // If scrolled more than 50px
      setScrolled(true);
      // Check if user is scrolling up
      if (window.scrollY < lastScrollY) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }
    } else {
      setScrolled(false);
      setScrollingUp(false); // Reset when not scrolled down
    }

    setLastScrollY(window.scrollY); // Update last scroll position
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // Re-run when scroll position changes

  return (
    <Navbar expand="lg" className={`custom-navbar py-3 ${scrolled ? (scrollingUp ? 'navbar-white' : 'navbar-scrolled') : ''}`}>
      <Container>
        {/* Website Title */}
        <Navbar.Brand href="/" className="brand-text">Real Estate Jobs.co</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Menu Options */}
            <Nav.Link href="#jobs" className="nav-link-custom">Home </Nav.Link>
            <Nav.Link href="#login" className="nav-link-custom"><Link to="/PostJob" style={{textDecoration:"none",color:"#fff"}}>Post Jobs</Link></Nav.Link>
            <Nav.Link href="#register" className="nav-link-custom">Companies</Nav.Link>
            <Nav.Link href="#company-register" className="nav-link-custom"><Link to="/premium" style={{textDecoration:"none",color:"#fff"}}>Premium</Link></Nav.Link>

            {/* Profile Dropdown */}
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
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#logout" onClick={()=>{
                localStorage.clear()
                window.location.reload();
              }}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar2;
