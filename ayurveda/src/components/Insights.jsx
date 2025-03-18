import React, { useState } from "react";

const Insights = () => {
  // Static Ayurveda insights
  const staticInsights = [
    {
      id: 1,
      title: "What is Ayurveda?",
      description:
        "Ayurveda is a 5,000-year-old holistic healing system originating from India. It focuses on balancing the body, mind, and spirit through natural remedies, diet, yoga, and meditation. Ayurveda emphasizes prevention and encourages maintaining health through close attention to balance in one's life.",
    },
    {
      id: 2,
      title: "The Three Doshas",
      description:
        "Ayurveda identifies three fundamental energies, or doshas, that govern our physiology: Vata (air and space), Pitta (fire and water), and Kapha (earth and water). Each person has a unique combination of these doshas, which determines their physical, mental, and emotional characteristics.",
    },
    {
      id: 3,
      title: "Ayurvedic Diet",
      description:
        "An Ayurvedic diet is tailored to your dosha and includes fresh, seasonal, and whole foods. It emphasizes the six tastes (sweet, sour, salty, bitter, pungent, and astringent) to ensure a balanced diet. For example, Vata types benefit from warm, grounding foods, while Pitta types thrive on cooling, hydrating foods.",
    },
    {
      id: 4,
      title: "Benefits of Ayurvedic Herbs",
      description:
        "Ayurvedic herbs like Ashwagandha, Turmeric, Tulsi, and Neem have powerful healing properties. Ashwagandha reduces stress, Turmeric fights inflammation, Tulsi boosts immunity, and Neem purifies the blood. These herbs are integral to Ayurvedic medicine and are used to treat various ailments.",
    },
    {
      id: 5,
      title: "Daily Routine (Dinacharya)",
      description:
        "Dinacharya is the Ayurvedic practice of following a daily routine to maintain balance and health. It includes waking up early, practicing yoga and meditation, eating meals at regular times, and going to bed early. This routine aligns the body with natural rhythms and promotes overall well-being.",
    },
    {
      id: 6,
      title: "Ayurveda for Stress Relief",
      description:
        "Ayurveda offers natural remedies for stress relief, such as meditation, Pranayama (breathing exercises), and herbal teas. Adaptogenic herbs like Ashwagandha and Brahmi help the body adapt to stress and promote mental clarity.",
    },
  ];

  // Static product recommendations
  const productRecommendations = [
    {
      id: 1,
      symptom: "stress",
      products: ["Ashwagandha Capsules", "Brahmi Tea", "Meditation Essential Oil Blend"],
    },
    {
      id: 2,
      symptom: "digestion",
      products: ["Triphala Powder", "Ginger Tea", "Ajwain Capsules"],
    },
    {
      id: 3,
      symptom: "skin issues",
      products: ["Neem Capsules", "Turmeric Face Cream", "Sandalwood Soap"],
    },
    {
      id: 4,
      symptom: "immunity",
      products: ["Tulsi Drops", "Chyawanprash", "Giloy Juice"],
    },
    {
      id: 5,
      symptom: "joint pain",
      products: ["Turmeric Capsules", "Mahanarayan Oil", "Shallaki Tablets"],
    },
  ];

  // State for user input and recommendations
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Handle user input and recommend products
  const handleRecommendations = () => {
    if (!userInput.trim()) {
      alert("Please enter your symptoms or concerns.");
      return;
    }

    const lowerCaseInput = userInput.toLowerCase();
    const matchedProducts = productRecommendations.find((item) =>
      lowerCaseInput.includes(item.symptom)
    );

    if (matchedProducts) {
      setRecommendations(matchedProducts.products);
    } else {
      setRecommendations(["No specific products found. Please consult an Ayurvedic practitioner."]);
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ffffff", // White background
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      color: "#5d4037", // Rich brown
      fontSize: "2.5rem",
      marginBottom: "30px",
      fontWeight: "600",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    },
    card: {
      backgroundColor: "#f5f5dc", // Beige background
      border: "1px solid #d7ccc8", // Light brown border
      borderRadius: "10px",
      padding: "20px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
    title: {
      color: "#5d4037", // Rich brown
      fontSize: "1.5rem",
      marginBottom: "10px",
      fontWeight: "600",
    },
    description: {
      color: "#6d4c41", // Medium brown
      fontSize: "1rem",
      lineHeight: "1.6",
    },
    recommendationSection: {
      backgroundColor: "#f5f5dc", // Beige background
      border: "1px solid #d7ccc8", // Light brown border
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
    },
    recommendationHeading: {
      color: "#5d4037", // Rich brown
      fontSize: "2rem",
      marginBottom: "10px",
    },
    recommendationSubtext: {
      color: "#6d4c41", // Medium brown
      fontSize: "1rem",
      marginBottom: "20px",
    },
    recommendationInput: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      border: "1px solid #d7ccc8", // Light brown border
      borderRadius: "5px",
      width: "300px",
      fontSize: "1rem",
    },
    button: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#5d4037", // Rich brown
      color: "#ffffff", // White text
      fontSize: "1rem",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#4e342e", // Darker brown
    },
    recommendationResults: {
      textAlign: "left",
      color: "#5d4037", // Rich brown
    },
    resultsHeading: {
      fontSize: "1.5rem",
      marginBottom: "10px",
    },
    list: {
      listStyleType: "disc",
      paddingLeft: "20px",
    },
    listItem: {
      fontSize: "1rem",
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Ayurveda Insights</h1>

      {/* Insights Grid */}
      <div style={styles.grid}>
        {staticInsights.map((insight) => (
          <div
            key={insight.id}
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h3 style={styles.title}>{insight.title}</h3>
            <p style={styles.description}>{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Product Recommendation Section */}
      <div style={styles.recommendationSection}>
        <h2 style={styles.recommendationHeading}>Get Product Recommendations</h2>
        <p style={styles.recommendationSubtext}>
          Enter your symptoms or concerns, and we'll recommend Ayurvedic products for you.
        </p>
        <div style={styles.recommendationInput}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="e.g., stress, digestion, skin issues"
            style={styles.input}
          />
          <button
            onClick={handleRecommendations}
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4e342e")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5d4037")}
          >
            Get Recommendations
          </button>
        </div>
        {recommendations.length > 0 && (
          <div style={styles.recommendationResults}>
            <h3 style={styles.resultsHeading}>Recommended Products:</h3>
            <ul style={styles.list}>
              {recommendations.map((product, index) => (
                <li key={index} style={styles.listItem}>
                  {product}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;