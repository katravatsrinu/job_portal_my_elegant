import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import CompanyCard from './CompanyCard';
import Carousel from './carousel';
import { companies } from '../data/companies';

const COMPANIES_PER_SLIDE = 3;

const CompanyShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 2; // We have 6 companies total, showing 3 at a time

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <Building2 className="text-primary me-2" size={32} />
            <h2 className="display-6 mb-0">Featured Companies</h2>
          </div>
          <p className="text-muted">Discover our trusted partners and industry leaders</p>
        </div>

        <div className="position-relative overflow-hidden">
          <div 
            className="d-flex transition-transform"
            style={{ 
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: 'transform 0.7s ease-in-out'
            }}
          >
            <div className="w-100 flex-shrink-0">
              <div className="row g-4">
                {companies.slice(0, 3).map((company) => (
                  <div key={company.id} className="col-md-4">
                    <CompanyCard {...company} />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-100 flex-shrink-0">
              <div className="row g-4">
                {companies.slice(3, 6).map((company) => (
                  <div key={company.id} className="col-md-4">
                    <CompanyCard {...company} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Carousel 
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          itemsCount={totalSlides}
        />
      </div>
    </section>
  );
};

export default CompanyShowcase;