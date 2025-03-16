import React, { useState } from 'react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleInputChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate diagnosis (replace with actual API call)
    setDiagnosis(`Based on your symptoms: "${symptoms}", it could be due to stress or lack of sleep. Consider consulting a healthcare professional for further evaluation.`);
    setSymptoms('');
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#4a4a4a',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#2c7a7b',
          fontSize: '24px',
          marginBottom: '10px',
        }}
      >
        Symptom Checker
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '14px',
          marginBottom: '20px',
        }}
      >
        Describe your symptoms, and we'll provide a preliminary assessment.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <textarea
          value={symptoms}
          onChange={handleInputChange}
          placeholder="Describe your symptoms..."
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
            outline: 'none',
            minHeight: '100px',
            resize: 'vertical',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2c7a7b',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Check Symptoms
        </button>
      </form>
      {diagnosis && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #eee',
          }}
        >
          <p style={{ color: '#333', margin: '0' }}>{diagnosis}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;