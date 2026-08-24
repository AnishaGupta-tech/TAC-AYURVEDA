import React from 'react';

const GuidanceCard = ({ guide, onReadMore }) => {
  return (
    <div className="guidance-card">
      <img src={guide.image} alt={guide.title} />
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <button onClick={() => (onReadMore ? onReadMore(guide) : window.open(guide.link || "/guidance", "_self"))}>
        Read More
      </button>
    </div>
  );
};

export default GuidanceCard;