import React, { useState, useEffect } from 'react';
import GuidanceCard from '../components/GuidanceCard';
import '../styles.css';

const GuidancePage = () => {
  const [guidance, setGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuidance = async () => {
      try {
        const response = await fetch('/api/guidance');
        if (!response.ok) {
          throw new Error('Failed to fetch guidance');
        }
        const data = await response.json();
        setGuidance(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, []);

  if (loading) {
    return <div className="loading">Loading guidance...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="guidance-page">
      <h1>Ayurvedic Guidance</h1>
      <div className="guidance-grid">
        {guidance.map((guide) => (
          <GuidanceCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
};

export default GuidancePage;