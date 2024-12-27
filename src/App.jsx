import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LandingPage from './pages/landingPage';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import CompanyLoginRegister from './components/auth/companylogin';
import LoginRegister from './components/auth/userlogin';
import CompanyLanding from './pages/companylanding';
import PricingPage from './pages/pricingPage';
import Jobpost from './pages/PostJob';
import AllJobs from './pages/jobs/jobsSection';
import EditProfileForm from './pages/editProfile';






function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage/>}  />
        <Route path="/companylogin" element={<CompanyLoginRegister />} />
        <Route path="/applicantlogin" element={<LoginRegister />} />
        <Route path="/CompanyLanding" element={<CompanyLanding />} />
        <Route path="/landing" element={<LandingPage/>}  />
        <Route path="/premium" element={<PricingPage/>}  />
        <Route path="/postJob" element={<Jobpost />}  />
        <Route path="/jobs" element={<AllJobs />}  />
        <Route path="/editProfile" element={<EditProfileForm />}  />


      
    </Routes>
</BrowserRouter>


  )
}

export default App
