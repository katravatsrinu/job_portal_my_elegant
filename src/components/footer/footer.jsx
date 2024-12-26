import React, { useEffect } from 'react';
import { gsap } from 'gsap'; // GSAP library

const Footer = () => {
  useEffect(() => {
    // GSAP Animations for sections
    gsap.from('.footer-section', {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 0.8,
      ease: 'power4.out',
    });

    // GSAP Animations for social media icons
    gsap.from('.social-icons a', {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.5,
      ease: 'bounce.out',
    });
  }, []);

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row footer-section">
          {/* Quick Links Section */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="#" className="text-white">Services</a></li>
              <li><a href="#" className="text-white">Candidates</a></li>
              <li><a href="#" className="text-white">News & Articles</a></li>
              <li><a href="#" className="text-white">Terms & Conditions</a></li>
              <li><a href="#" className="text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="col-md-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Job Portal</a></li>
              <li><a href="#" className="text-white">Travel</a></li>
              <li><a href="#" className="text-white">Job Seekers</a></li>
              <li><a href="#" className="text-white">Inspiration</a></li>
              <li><a href="#" className="text-white">Terms & Conditions</a></li>
              <li><a href="#" className="text-white">Job Management</a></li>
            </ul>
          </div>

          {/* Touch With Us Section */}
          <div className="col-md-4">
            <h5>Touch With Us</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt"></i> Location: Hitech City Real Estate Hub, City Center</li>
              <li><i className="bi bi-phone"></i> Mobile: +91 1234567890</li>
              <li><i className="bi bi-envelope"></i> Email: realestatejobs@jobArea.com</li>
              <li><i className="bi bi-globe"></i> Website: www.realestatejobs.com</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Social Icons */}
        <div className="row footer-section mt-4">
          <div className="col-12 text-center">
            <p>&copy; 2024 Real Estate Job Portal. All rights reserved.</p>
            <div className="social-icons">
              <a href="#" className="text-white mx-2"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white mx-2"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white mx-2"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white mx-2"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
