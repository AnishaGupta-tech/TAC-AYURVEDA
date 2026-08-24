import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'var(--color-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h3
        style={{
          fontSize: '24px',
          margin: '0',
          color: 'var(--color-primary)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '16px',
          color: 'var(--color-text-muted)',
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
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-surface)',
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