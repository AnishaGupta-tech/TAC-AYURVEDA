import React from 'react';
import Banner from '../components/Banner';
import FeatureCard from '../components/FeatureCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const features = [
    {
      title: 'AI Health Assistant',
      description: 'Get personalized health advice from our AI-powered assistant.',
      link: '/ai-assistant',
    },
    {
      title: 'Health Insights',
      description: 'Track your health metrics and get actionable insights.',
      link: '/health-insights',
    },
    {
      title: 'Symptom Checker',
      description: 'Describe your symptoms and get a preliminary diagnosis.',
      link: '/symptom-checker',
    },
    {
      title: 'Prakriti Analysis',
      description: 'Discover your Ayurvedic body type and get tailored recommendations.',
      link: '/prakriti-analysis',
    },
  ];

  return (
    <div className="home">
      <Navbar />
      <Banner />
      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;