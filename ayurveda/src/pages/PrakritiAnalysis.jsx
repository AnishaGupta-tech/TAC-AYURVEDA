import React, { useState } from 'react';

const PrakritiAnalysis = () => {
  const [answers, setAnswers] = useState({});
  const [prakritiType, setPrakritiType] = useState('');

  const questions = [
    "Do you often feel cold?",
    "Do you have a fast metabolism?",
    "Do you tend to gain weight easily?",
  ];

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Prakriti analysis (replace with actual logic)
    const prakriti = Math.random() < 0.5 ? 'Vata' : Math.random() < 0.5 ? 'Pitta' : 'Kapha';
    setPrakritiType(`Your Ayurvedic body type is: ${prakriti}`);
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
        Prakriti Analysis
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '14px',
          marginBottom: '20px',
        }}
      >
        Answer the following questions to discover your Ayurvedic body type.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {questions.map((question, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <p style={{ margin: '0', fontSize: '16px' }}>{question}</p>
            <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <button
                type="button"
                onClick={() => handleAnswer(index, 'Yes')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: answers[index] === 'Yes' ? '#2c7a7b' : '#eee',
                  color: answers[index] === 'Yes' ? '#fff' : '#333',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(index, 'No')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: answers[index] === 'No' ? '#2c7a7b' : '#eee',
                  color: answers[index] === 'No' ? '#fff' : '#333',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                No
              </button>
            </div>
          </div>
        ))}
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
            marginTop: '10px',
          }}
        >
          Analyze
        </button>
      </form>
      {prakritiType && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #eee',
          }}
        >
          <p style={{ color: '#333', margin: '0' }}>{prakritiType}</p>
        </div>
      )}
    </div>
  );
};

export default PrakritiAnalysis;