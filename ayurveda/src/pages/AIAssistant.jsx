import React, { useState } from "react";

const AIAssistant = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Predefined queries and responses
  const queriesAndResponses = [
    {
      keywords: ["hello", "hi", "hey"],
      response: "Namaste! How can I assist you with Ayurveda and your health today?",
    },
    {
      keywords: ["dosha", "vata", "pitta", "kapha"],
      response:
        "In Ayurveda, there are three doshas: Vata (air and space), Pitta (fire and water), and Kapha (earth and water). Each person has a unique combination of these doshas. Would you like to know more about your dosha?",
    },
    {
      keywords: ["herbs", "ashwagandha", "turmeric", "tulsi", "neem", "ginger"],
      response:
        "Ayurvedic herbs like Ashwagandha, Turmeric, Tulsi, Neem, and Ginger have powerful healing properties. For example, Ashwagandha helps reduce stress, and Turmeric is great for inflammation. Which herb are you interested in?",
    },
    {
      keywords: ["diet", "food", "nutrition"],
      response:
        "An Ayurvedic diet focuses on balancing your dosha with the right foods. For example, Vata types benefit from warm, grounding foods, while Pitta types thrive on cooling, hydrating foods. What would you like to know about Ayurvedic nutrition?",
    },
    {
      keywords: ["yoga", "meditation"],
      response:
        "Yoga and meditation are integral parts of Ayurveda. They help balance the mind and body. For Vata, gentle yoga is recommended; for Pitta, cooling poses; and for Kapha, energizing practices. Do you need guidance on yoga or meditation?",
    },
    {
      keywords: ["stress", "anxiety"],
      response:
        "Ayurveda offers natural remedies for stress relief, such as meditation, Pranayama (breathing exercises), and herbal teas. Adaptogenic herbs like Ashwagandha and Brahmi can also help. Would you like more tips?",
    },
    {
      keywords: ["digestion", "bloating", "constipation"],
      response:
        "For digestive issues, Ayurveda recommends warm water with lemon and ginger in the morning, Triphala powder, and avoiding cold or processed foods. Would you like more advice?",
    },
    {
      keywords: ["skin", "acne", "eczema"],
      response:
        "For skin issues, Ayurveda suggests using Neem paste, Turmeric face packs, and Sandalwood soap. Drinking plenty of water and eating a balanced diet also helps. Do you need more details?",
    },
    {
      keywords: ["immunity", "cold", "fever"],
      response:
        "To boost immunity, Ayurveda recommends Tulsi drops, Chyawanprash, and Giloy juice. For cold and fever, drink Tulsi tea with ginger and honey. Would you like more recommendations?",
    },
    {
      keywords: ["sleep", "insomnia"],
      response:
        "For better sleep, Ayurveda suggests a warm milk drink with nutmeg before bed, avoiding screens at night, and practicing relaxation techniques like meditation. Do you need more tips?",
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

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const simulateAIResponse = async (input) => {
    // Simulate a delay for real-time typing effect
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay

    // Find a matching response based on keywords
    const lowerCaseInput = input.toLowerCase();
    let response =
      "I’m here to help with Ayurveda and general health. Can you please elaborate on your query?";
    for (const item of queriesAndResponses) {
      for (const keyword of item.keywords) {
        if (lowerCaseInput.includes(keyword)) {
          response = item.response;
          break;
        }
      }
    }
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const response = await simulateAIResponse(userInput);
    setAIResponse(response);
    setIsTyping(false);
    setUserInput("");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        color: "#4a4a4a",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#5d4037", fontSize: "24px", margin: "0" }}>
          🌿 Ayurvedic AI Assistant
        </h2>
        <p style={{ color: "#666", fontSize: "14px", margin: "5px 0 0" }}>
          Ask me anything about your health, doshas, or lifestyle.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Ask me anything about your health..."
          disabled={isTyping}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isTyping}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#5d4037",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {isTyping ? "Thinking..." : "Ask"}
        </button>
      </form>
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f5f5dc",
          borderRadius: "8px",
          border: "1px solid #d7ccc8",
          minHeight: "50px",
        }}
      >
        {isTyping ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>Typing...</p>
        ) : (
          <p style={{ color: "#5d4037", margin: "0" }}>{aiResponse}</p>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;