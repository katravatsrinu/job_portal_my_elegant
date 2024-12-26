import React from 'react';
import './test.css'; // Ensure this CSS file has your styles

const Testimonials = () => {
  // Real estate job seeker success stories
  const successStories = [
    {
      name: "Ravi Kumar",
      feedback: "I was able to land my dream job as a property manager in just two weeks! RealEstateJob.co made it so easy to apply, and the interview process was quick and seamless.",
      image: "https://xsgames.co/randomusers/assets/avatars/male/75.jpg",
    },
    {
      name: "Mudavath Srinu",
      feedback: "After months of struggling to find the right job, I finally got hired as a senior real estate agent. The platform provided personalized recommendations that fit my skills and interests perfectly.",
      image: "https://xsgames.co/randomusers/assets/avatars/male/17.jpg",
    },
    {
      name: "Srinivasulu",
      feedback: "RealEstateJob.co made my job search experience effortless. I applied to three companies, got interviewed by two, and received an offer from one in less than a month. Highly recommend it for anyone in real estate!",
      image: "https://xsgames.co/randomusers/assets/avatars/male/0.jpg",
    },
    {
      name: "David Miller",
      feedback: "Thanks to RealEstateJob.co, I found a property consultant role with an amazing team. The platform connected me with top-tier employers in the real estate market.",
      image: "https://xsgames.co/randomusers/assets/avatars/male/70.jpg",
    },
    {
      name: "Katravath Srinu",
      feedback: "I had been job hunting for months before I found RealEstateJob.co. Within weeks, I was hired as a real estate analyst. The site is so user-friendly, and it gave me all the tools I needed to get hired.",
      image: "https://xsgames.co/randomusers/assets/avatars/male/48.jpg",
    },
    {
      name: "James Taylor",
      feedback: "The process was so simple! I uploaded my resume, and within a few days, I had interviews lined up for various positions. I now work as a leasing agent thanks to RealEstateJob.co.",
      image: "https://xsgames.co/randomusers/assets/avatars/male/50.jpg",
    },
  ];

  return (
    <div className="testimonials">
      <h3>What Our Users Say About Us</h3>
      <p>
        Read the success stories of individuals who found their dream jobs in real estate using **RealEstateJob.co**. They trusted our platform to connect them with top real estate employers, and here's how they made it happen.
      </p>
      
      <div className="testimonial-list-container">
        {successStories.map((story, index) => (
          <div className="testimonial-items" key={index}>
            <img src={story.image} alt={`user${index + 1}`} loading="lazy" />
            <p className="italic">{`"${story.feedback}"`}</p>
            <h4>{story.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
