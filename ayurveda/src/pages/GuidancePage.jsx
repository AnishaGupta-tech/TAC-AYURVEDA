import React, { useState, useEffect } from 'react';

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
    return <div style={styles.loading}>Loading guidance...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.guidancePage}>
      <h1 style={styles.header}>Ayurvedic Guidance</h1>
      <div style={styles.guidanceGrid}>
        {guidance.map((guide) => (
          <div key={guide.id} style={styles.guidanceCard}>
            <img src={guide.image} alt={guide.title} style={styles.cardImage} />
            <h2 style={styles.cardTitle}>{guide.title}</h2>
            <p style={styles.cardDescription}>{guide.description}</p>
            <button style={styles.cardButton}>Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  guidancePage: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#6b5b4a',
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontFamily: 'Georgia, serif',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#6b5b4a',
    marginTop: '20px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#6b5b4a',
    marginTop: '20px',
  },
  guidanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  guidanceCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#6b5b4a',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.5',
  },
  cardButton: {
    padding: '10px 20px',
    backgroundColor: '#6b5b4a',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default GuidancePage;