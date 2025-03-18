import React, { useState, useEffect, useRef } from "react";

const ChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatWindowRef = useRef(null);

  // Custom queries and replies
  const customResponses = [
    {
      keywords: ["hello", "hi", "hey"],
      response: "Hello! How can I assist you with Ayurveda today?",
    },
    {
      keywords: ["ayurveda", "ayurvedic"],
      response:
        "Ayurveda is a holistic healing system that originated in India. It focuses on balancing the body, mind, and spirit. How can I help you with Ayurvedic practices?",
    },
    {
      keywords: ["dosha", "vata", "pitta", "kapha"],
      response:
        "In Ayurveda, there are three doshas: Vata, Pitta, and Kapha. Each represents a unique combination of elements. Would you like to know more about your dosha?",
    },
    {
      keywords: ["herbs", "ashwagandha", "turmeric", "tulsi", "neem", "ginger"],
      response:
        "Ayurvedic herbs like Ashwagandha, Turmeric, Tulsi, Neem, and Ginger have powerful healing properties. Which herb are you interested in?",
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
    {
      keywords: ["symptoms", "cough", "cold", "fever", "headache", "digestion", "skin"],
      response:
        "Based on your symptoms, here are some Ayurvedic recommendations: \n" +
        "- For cough and cold: Drink Tulsi tea with ginger and honey. \n" +
        "- For fever: Take Giloy juice or decoction. \n" +
        "- For headache: Apply peppermint oil on your forehead. \n" +
        "- For digestion: Drink warm water with lemon and ginger in the morning. \n" +
        "- For skin issues: Apply neem paste or use turmeric and sandalwood face packs. \n" +
        "Would you like more details on any of these?",
    },
    {
      keywords: ["recommendations", "advice"],
      response:
        "Sure! Please describe your symptoms or concerns, and I'll provide Ayurvedic recommendations.",
    },
    {
      keywords: ["general", "health"],
      response:
        "For general health, Ayurveda recommends: \n" +
        "- Wake up early and follow a daily routine (Dinacharya). \n" +
        "- Practice yoga and meditation daily. \n" +
        "- Eat fresh, seasonal, and balanced meals. \n" +
        "- Stay hydrated with warm water. \n" +
        "- Get adequate sleep. \n" +
        "Do you have any specific health concerns?",
    },
  ];

  // Scroll to the bottom of the chat window
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // Simulate bot typing delay
  const simulateBotTyping = () => {
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
    }, 1000); // 1-second typing delay
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot typing
    simulateBotTyping();

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

    // Add bot response to the chat after typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 1000); // 1-second delay before bot responds
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Ayurvedic Health Chatbot</h1>
      <div style={styles.chatWindow} ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === "user" ? styles.userMessage : styles.botMessage),
            }}
          >
            {msg.text.split("\n").map((line, i) => (
              <p key={i} style={{ margin: "5px 0" }}>
                {line}
              </p>
            ))}
          </div>
        ))}
        {isBotTyping && (
          <div style={styles.typingIndicator}>
            <span>Bot is typing...</span>
          </div>
        )}
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
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#8B4513", // Brown for user messages
    color: "#FFFFFF", // White text for user messages
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F5DC", // Beige for bot messages
    color: "#000000", // Black text for bot messages
    border: "1px solid #8B4513", // Brown border for bot messages
  },
  typingIndicator: {
    alignSelf: "flex-start",
    color: "#8B4513", // Brown text
    fontStyle: "italic",
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