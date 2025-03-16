import React from 'react';

const GuidanceCard = ({ guide }) => {
  return (
    <div className="guidance-card">
      <img src={guide.image} alt={guide.title} />
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <button>Read More</button>
    </div>
  );
};

export default GuidanceCard;