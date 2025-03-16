import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Ayurveda Health</Link>
      </div>
      <div className="nav-links">
        <Link to="/ai-assistant">AI Assistant</Link>
        <Link to="/health-insights">Health Insights</Link>
        <Link to="/symptom-checker">Symptom Checker</Link>
        <Link to="/prakriti-analysis">Prakriti Analysis</Link>
      </div>
    </nav>
  );
};

export default Navbar;