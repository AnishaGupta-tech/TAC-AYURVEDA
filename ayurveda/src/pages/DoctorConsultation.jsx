import React, { useState } from 'react';
import DoctorList from '../components/DoctorList';
import './DoctorConsultation.css';
import ChatAI from '../components/ChatAI';
import Insights from '../components/Insights';

const DoctorConsultation = () => {
  const [activeTab, setActiveTab] = useState('doctors');

  return (
    <div className="doctor-consultation">
      <h1 className="title">Ayurveda Doctor Consultation</h1>
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