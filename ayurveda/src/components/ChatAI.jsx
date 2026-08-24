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

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Local fallback used only if the AI backend is unreachable
  const getLocalReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    let botReply = "I’m here to help with Ayurveda and general health. Can you please elaborate on your query?";
    for (const item of customResponses) {
      for (const keyword of item.keywords) {
        if (lowerCaseMessage.includes(keyword)) {
          botReply = item.response;
          break;
        }
      }
    }
    return botReply;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    // Add user message to the chat
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");

    // Show typing indicator while we wait for the AI backend
    setIsBotTyping(true);

    let botReply;
    try {
      const response = await fetch(`${baseURL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) throw new Error("Chat request failed");
      const data = await response.json();
      botReply = data.message;
    } catch (err) {
      console.error("AI chat backend unavailable, using local fallback:", err);
      botReply = getLocalReply(userMessage);
    }

    setIsBotTyping(false);
    setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
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
    fontFamily: "var(--font-sans)",
    backgroundColor: "var(--color-surface)", // White background
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "var(--color-secondary-dark)", // Brown color for heading
    marginBottom: "20px",
  },
  chatWindow: {
    height: "400px",
    overflowY: "scroll",
    border: "1px solid var(--color-secondary-dark)", // Brown border
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "var(--color-bg-alt)", // Beige background for chat window
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
    backgroundColor: "var(--color-secondary-dark)", // Brown for user messages
    color: "var(--color-surface)", // White text for user messages
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "var(--color-bg-alt)", // Beige for bot messages
    color: "var(--color-text)", // Black text for bot messages
    border: "1px solid var(--color-secondary-dark)", // Brown border for bot messages
  },
  typingIndicator: {
    alignSelf: "flex-start",
    color: "var(--color-secondary-dark)", // Brown text
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
    border: "1px solid var(--color-secondary-dark)", // Brown border
    backgroundColor: "var(--color-surface)", // White background
    color: "var(--color-text)", // Black text
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "var(--color-secondary-dark)", // Brown background
    color: "var(--color-surface)", // White text
    cursor: "pointer",
  },
};

export default ChatAI;