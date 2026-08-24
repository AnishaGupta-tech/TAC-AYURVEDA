import React, { useState } from 'react';
import DoctorList from '../components/DoctorList';
import './DoctorConsultation.css';
import ChatAI from '../components/ChatAI';
import Insights from '../components/Insights';
import PageBanner from '../components/PageBanner';

const DoctorConsultation = () => {
  const [activeTab, setActiveTab] = useState('doctors');

  return (
    <div className="doctor-consultation">
      <PageBanner
        title="Ayurvedic Consultation"
        subtitle="Book time with a certified Vaidya, chat with our AI wellness guide, or browse Ayurveda insights."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
      />
      <div className="tabs">
        <button
          className={activeTab === 'doctors' ? 'active' : ''}
          onClick={() => setActiveTab('doctors')}
        >
          Book a Doctor
        </button>
        <button
          className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => setActiveTab('chat')}
        >
          Chat with AI
        </button>
        <button
          className={activeTab === 'insights' ? 'active' : ''}
          onClick={() => setActiveTab('insights')}
        >
          Ayurveda Insights
        </button>
      </div>
      <div className="content">
        {activeTab === 'doctors' && <DoctorList />}
        {activeTab === 'chat' && <ChatAI />}
        {activeTab === 'insights' && <Insights />}
      </div>
    </div>
  );
};

export default DoctorConsultation;