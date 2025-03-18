import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import '../styles.css';

const HealthInsights = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualData, setManualData] = useState({
    heartRate: '',
    sleepQuality: '',
    activityLevel: '',
    stressLevel: '',
  });

  // Fetch health data from the backend
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch('/api/health-data'); // Use proxy path
        if (!response.ok) {
          throw new Error('Failed to fetch health data');
        }
        const data = await response.json();
        setHealthData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHealthData();
  }, []);

  // Handle manual data input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualData({ ...manualData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/manual-health-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualData),
      });

      if (!response.ok) {
        throw new Error('Failed to update health data');
      }

      const data = await response.json();
      setHealthData(data.data); // Update the displayed health data
      alert('Health data updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading health data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="health-insights">
      <Navbar />
      <div className="health-insights-content">
        <h1>Health Insights</h1>

        {/* Health Metrics Section */}
        <div className="health-metrics">
          <div className="metric-card">
            <h2>Heart Rate</h2>
            <p>{healthData.heartRate} bpm</p>
            <div className="metric-trend">
              <span className="trend-up">↑ 5%</span> from last week
            </div>
          </div>
          <div className="metric-card">
            <h2>Sleep Quality</h2>
            <p>{healthData.sleepQuality}</p>
            <div className="metric-trend">
              <span className="trend-down">↓ 2%</span> from last week
            </div>
          </div>
          <div className="metric-card">
            <h2>Activity Level</h2>
            <p>{healthData.activityLevel}</p>
            <div className="metric-trend">
              <span className="trend-up">↑ 10%</span> from last week
            </div>
          </div>
          <div className="metric-card">
            <h2>Stress Level</h2>
            <p>{healthData.stressLevel}</p>
            <div className="metric-trend">
              <span className="trend-down">↓ 3%</span> from last week
            </div>
          </div>
        </div>

        {/* Manual Data Input Section */}
        <div className="manual-data-section">
          <h2>Enter Your Health Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Heart Rate (bpm):</label>
              <input
                type="number"
                name="heartRate"
                value={manualData.heartRate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sleep Quality:</label>
              <select
                name="sleepQuality"
                value={manualData.sleepQuality}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Activity Level:</label>
              <select
                name="activityLevel"
                value={manualData.activityLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>Stress Level:</label>
              <select
                name="stressLevel"
                value={manualData.stressLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default HealthInsights;