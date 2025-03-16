import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#5d4037',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h3
        style={{
          fontSize: '24px',
          margin: '0',
          color: '#5d4037',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '16px',
          color: '#666',
          margin: '0',
        }}
      >
        {description}
      </p>
      <Link
        to={link}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#5d4037',
          color: '#fff',
          fontSize: '16px',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        Explore
      </Link>
    </div>
  );
};

export default FeatureCard;