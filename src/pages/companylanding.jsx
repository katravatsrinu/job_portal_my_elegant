import React from "react";
import NavBar2 from "../components/nav/navbar2";
import HeroSection2 from "../components/hero/HeroSection2";
import CompanyShowcase from "../components/comapnyCards/CompanyShowcase";

import JobList2 from "../components/jobLists/JobList2";
import Testimonials from "../components/testimonial/testimonial";
import Footer from "../components/footer/footer";


const CompanyLanding=()=>{
    return(
        <>
            <div style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>

        <NavBar2 />
        <HeroSection2 />
        <CompanyShowcase />
        <JobList2 />
        <Testimonials />
        <Footer />
        </div>
        </>
    )
}
export default CompanyLanding;