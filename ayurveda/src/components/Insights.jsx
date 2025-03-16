import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

const Insights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ayurveda-insights')
      .then((response) => setInsights(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="insights">
      <h2>Ayurveda Insights</h2>
      <div className="insights-list">
        {insights.map((insight) => (
          <div key={insight.id} className="insight-card">
            <h3>{insight.title}</h3>
            <p>{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;