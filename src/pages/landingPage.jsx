// Home.jsx
import React from 'react';
import NavBar from '../components/navbar';
import HeroSection from '../components/HeroSection';
import CompanyShowcase from '../components/CompanyShowcase';
import JobList from '../components/jobLists/JobList';
import Footer from '../components/footer';





const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <CompanyShowcase />
      <JobList />

      <Footer />
    </div>
  );
};

export default LandingPage;
