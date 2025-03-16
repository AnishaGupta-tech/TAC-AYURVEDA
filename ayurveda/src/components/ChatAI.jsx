import React, { useState } from "react";

const ChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Custom queries and replies
  const customResponses = [
    {
      keywords: ["hello", "hi", "hey"],
      response: "Hello! How can I assist you with Ayurveda today?",
    },
    {
      keywords: ["ayurveda", "ayurvedic"],
      response:
        "Ayurveda is a holistic healing system that originated in India. How can I help you with Ayurvedic practices?",
    },
    {
      keywords: ["dosha", "vata", "pitta", "kapha"],
      response:
        "In Ayurveda, there are three doshas: Vata, Pitta, and Kapha. Each represents a unique combination of elements. Would you like to know more about your dosha?",
    },
    {
      keywords: ["herbs", "ashwagandha", "turmeric", "tulsi"],
      response:
        "Ayurvedic herbs like Ashwagandha, Turmeric, and Tulsi have powerful healing properties. Which herb are you interested in?",
    },
    {
      keywords: ["diet", "food", "nutrition"],
      response:
        "An Ayurvedic diet focuses on balancing your dosha with the right foods. What would you like to know about Ayurvedic nutrition?",
    },
    {
      keywords: ["yoga", "meditation"],
      response:
        "Yoga and meditation are integral parts of Ayurveda. They help balance the mind and body. Do you need guidance on yoga or meditation?",
    },
    {
      keywords: ["thank you", "thanks"],
      response: "You're welcome! Let me know if you have more questions about Ayurveda.",
    },
    {
      keywords: ["bye", "goodbye"],
      response: "Goodbye! Take care and stay healthy with Ayurveda.",
    },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    // Convert the message to lowercase for case-insensitive matching
    const lowerCaseMessage = input.toLowerCase();

    // Check for custom responses
    let botReply = "I’m here to help with Ayurveda and general health. Can you please elaborate on your query?";
    for (const item of customResponses) {
      for (const keyword of item.keywords) {
        if (lowerCaseMessage.includes(keyword)) {
          botReply = item.response;
          break;
        }
      }
    }

    // Add bot response to the chat
    setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Ayurvedic Health Chatbot</h1>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              textAlign: msg.sender === "user" ? "right" : "left",
              backgroundColor: msg.sender === "user" ? "#8B4513" : "#F5F5DC", // Brown for user, Beige for bot
              color: msg.sender === "user" ? "#FFFFFF" : "#000000", // White text for user, Black text for bot
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Ask your Ayurvedic or health query..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#FFFFFF", // White background
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#8B4513", // Brown color for heading
    marginBottom: "20px",
  },
  chatWindow: {
    height: "400px",
    overflowY: "scroll",
    border: "1px solid #8B4513", // Brown border
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#F5F5DC", // Beige background for chat window
  },
  message: {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    display: "inline-block",
    maxWidth: "80%",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #8B4513", // Brown border
    backgroundColor: "#FFFFFF", // White background
    color: "#000000", // Black text
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#8B4513", // Brown background
    color: "#FFFFFF", // White text
    cursor: "pointer",
  },
};

export default ChatAI;