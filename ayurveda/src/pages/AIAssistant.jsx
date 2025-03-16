import React, { useState } from 'react';

const AIAssistant = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const simulateAIResponse = async (input) => {
    // Simulate a delay for real-time typing effect
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay

    // Simulate an Ayurvedic AI response
    const response = `Namaste! Based on Ayurvedic principles, ${input} can be addressed by balancing your doshas. For example, try incorporating more warm, grounding foods like ginger and turmeric. Always consult a qualified practitioner for personalized advice.`;
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const response = await simulateAIResponse(userInput);
    setAIResponse(response);
    setIsTyping(false);
    setUserInput('');
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
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c7a7b', fontSize: '24px', margin: '0' }}>
          🌿 Ayurvedic AI Assistant
        </h2>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0 0' }}>
          Ask me anything about your health, doshas, or lifestyle.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
      >
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Ask me anything about your health..."
          disabled={isTyping}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={isTyping}
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
          {isTyping ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          border: '1px solid #eee',
          minHeight: '50px',
        }}
      >
        {isTyping ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Typing...</p>
        ) : (
          <p style={{ color: '#333', margin: '0' }}>{aiResponse}</p>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;