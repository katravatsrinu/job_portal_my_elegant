import React from 'react';

const Carousel = ({ activeIndex, setActiveIndex, itemsCount }) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      {Array.from({ length: itemsCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`btn btn-sm rounded-pill mx-1 ${
            activeIndex === index ? 'btn-primary px-3' : 'btn-light px-2'
          }`}
          style={{ 
            width: activeIndex === index ? '24px' : '8px',
            height: '8px',
            padding: '0',
            transition: 'all 0.3s ease'
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Carousel;
