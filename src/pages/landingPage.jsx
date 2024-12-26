// Home.jsx
import React from 'react';


import CompanyShowcase from '../components/comapnyCards/CompanyShowcase';
import NavBar from '../components/nav/navbar';
import HeroSection from '../components/hero/HeroSection';
import JobList from '../components/jobLists/JobList'
import Testimonials from '../components/testimonial/testimonial';
import Footer from '../components/footer/footer'







const LandingPage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <CompanyShowcase />
      <JobList />
      <Testimonials />
      <Footer />
      
     
    </>
  
  );
};

export default LandingPage;
