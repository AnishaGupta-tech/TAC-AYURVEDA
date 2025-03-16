import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import FeatureCard from './FeatureCard';
import Footer from './Footer';

const AdvancedDiagnostics = () => {
  const features = [
    {
      title: 'AI Health Assistant',
      description: 'Get personalized health advice from our AI-powered assistant.',
      link: '/advanced-diagnostics/ai-assistant',
    },
    {
      title: 'Health Insights',
      description: 'Track your health metrics and get actionable insights.',
      link: '/advanced-diagnostics/health-insights',
    },
    {
      title: 'Symptom Checker',
      description: 'Describe your symptoms and get a preliminary diagnosis.',
      link: '/advanced-diagnostics/symptom-checker',
    },
    {
      title: 'Prakriti Analysis',
      description: 'Discover your Ayurvedic body type and get tailored recommendations.',
      link: '/advanced-diagnostics/prakriti-analysis',
    },
  ];

  return (
    
    <div
      style={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Navbar />
      <Banner />
      <div
        style={{
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#5d4037',
            fontSize: '36px',
            marginBottom: '20px',
          }}
        >
          Advanced Diagnostics
        </h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                textDecoration: 'none',
                color: '#5d4037',
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvancedDiagnostics;