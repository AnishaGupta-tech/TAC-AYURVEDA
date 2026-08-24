import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">🌿 AyurSphere</span>
          <p>Ancient Ayurvedic wisdom, guided by modern AI — personalized wellness for mind, body, and spirit.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/guidance">Guidance</Link>
          <Link to="/doctor-consultation">Consult a Doctor</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <h4>Diagnostics</h4>
          <Link to="/advanced-diagnostics/ai-assistant">AI Assistant</Link>
          <Link to="/advanced-diagnostics/health-insights">Health Insights</Link>
          <Link to="/advanced-diagnostics/symptom-checker">Symptom Checker</Link>
          <Link to="/advanced-diagnostics/prakriti-analysis">Prakriti Analysis</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AyurSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
