import React from 'react';

const CompanyCard = ({ name, description, image }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img 
          src={image} 
          alt={name} 
          className="card-img-top"
          style={{ height: '160px', objectFit: 'cover' }}
        />
        <div 
          className="position-absolute bottom-0 start-0 w-100 h-50" 
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
          }} 
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
