import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css'; // Link to the CSS file

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/src/assets/hero1.jpeg" className="d-block w-100 hero-image" alt="Hero 1" />
          </div>
          <div className="carousel-item">
            <img src="/src/assets/hero2.jpg" className="d-block w-100 hero-image" alt="Hero 2" />
          </div>
          <div className="carousel-item">
            <img src="/src/assets/hero3.jpg" className="d-block w-100 hero-image" alt="Hero 3" />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
      </div>

      <div className="hero-content">
        <h1>Join a Thriving Industry – Real Estate Awaits You</h1>
      </div>
    </div>
  );
};

export default HeroSection;
