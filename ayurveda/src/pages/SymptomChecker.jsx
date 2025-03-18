import React, { useState } from "react";

const SymptomChecker = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    duration: "",
  });
  const [analysis, setAnalysis] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [ayurvedicInsights, setAyurvedicInsights] = useState("");

  // Static product recommendations and Ayurvedic insights
  const symptomData = [
    {
      symptom: "stress",
      advice:
        "Stress can be managed through Ayurvedic practices like meditation, yoga, and herbal remedies. Try incorporating Ashwagandha and Brahmi into your routine.",
      products: ["Ashwagandha Capsules", "Brahmi Tea", "Meditation Essential Oil Blend"],
      insights:
        "In Ayurveda, stress is often linked to an imbalance in the Vata dosha. Practices like Abhyanga (oil massage) and Shirodhara (oil pouring on the forehead) can help calm the mind.",
    },
    {
      symptom: "digestion",
      advice:
        "Digestive issues can be addressed with Ayurvedic herbs like Triphala and Ginger. Avoid cold or processed foods and drink warm water with lemon in the morning.",
      products: ["Triphala Powder", "Ginger Tea", "Ajwain Capsules"],
      insights:
        "Digestive health is governed by the Agni (digestive fire) in Ayurveda. Imbalanced Agni can lead to issues like bloating and constipation. Eating warm, cooked meals at regular intervals helps maintain Agni.",
    },
    {
      symptom: "skin issues",
      advice:
        "For skin problems, Ayurveda recommends using Neem and Turmeric. Maintain a balanced diet and stay hydrated.",
      products: ["Neem Capsules", "Turmeric Face Cream", "Sandalwood Soap"],
      insights:
        "Skin health in Ayurveda is connected to the balance of Pitta dosha. Avoiding spicy and oily foods, and using cooling herbs like Aloe Vera can help maintain healthy skin.",
    },
    {
      symptom: "immunity",
      advice:
        "Boost your immunity with Ayurvedic herbs like Tulsi and Giloy. Drink Tulsi tea daily and include Chyawanprash in your diet.",
      products: ["Tulsi Drops", "Chyawanprash", "Giloy Juice"],
      insights:
        "Immunity in Ayurveda is linked to Ojas, the essence of vitality. Strengthening Ojas through a balanced diet, proper sleep, and stress management is key to good immunity.",
    },
    {
      symptom: "joint pain",
      advice:
        "For joint pain, Ayurveda suggests using Turmeric and Mahanarayan Oil. Practice gentle yoga and avoid cold, damp environments.",
      products: ["Turmeric Capsules", "Mahanarayan Oil", "Shallaki Tablets"],
      insights:
        "Joint pain is often associated with an imbalance in Vata dosha. Warm oil massages and anti-inflammatory herbs like Shallaki can provide relief.",
    },
    {
      symptom: "sleep issues",
      advice:
        "Improve your sleep with Ayurvedic remedies like warm milk with nutmeg and relaxation techniques. Avoid screens before bedtime.",
      products: ["Ashwagandha Capsules", "Nutmeg Powder", "Relaxation Essential Oil Blend"],
      insights:
        "Sleep disorders in Ayurveda are often linked to an imbalance in Vata or Pitta dosha. Establishing a calming bedtime routine and avoiding stimulating activities can help improve sleep quality.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.symptoms.trim()) return;

    // Simulate analysis and recommendations
    const lowerCaseSymptoms = formData.symptoms.toLowerCase();
    const matchedData = symptomData.find((item) => lowerCaseSymptoms.includes(item.symptom));

    if (matchedData) {
      setAnalysis(matchedData.advice);
      setRecommendations(matchedData.products);
      setAyurvedicInsights(matchedData.insights);
    } else {
      setAnalysis("No specific advice found. Please consult an Ayurvedic practitioner for personalized guidance.");
      setRecommendations([]);
      setAyurvedicInsights("");
    }
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
      <h2
        style={{
          textAlign: "center",
          color: "#5d4037",
          fontSize: "24px",
          marginBottom: "10px",
        }}
      >
        🌿 Ayurvedic Symptom Checker
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        Fill out the form, and we'll provide Ayurvedic advice, product recommendations, and insights.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Your Age"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleInputChange}
          placeholder="Describe your symptoms..."
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
            minHeight: "100px",
            resize: "vertical",
          }}
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="How long have you had these symptoms?"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          type="submit"
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4e342e")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5d4037")}
        >
          Submit
        </button>
      </form>
      {analysis && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5dc",
            borderRadius: "8px",
            border: "1px solid #d7ccc8",
          }}
        >
          <h3 style={{ color: "#5d4037", fontSize: "18px", marginBottom: "10px" }}>
            Ayurvedic Advice:
          </h3>
          <p style={{ color: "#5d4037", margin: "0" }}>{analysis}</p>
        </div>
      )}
      {recommendations.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5dc",
            borderRadius: "8px",
            border: "1px solid #d7ccc8",
          }}
        >
          <h3 style={{ color: "#5d4037", fontSize: "18px", marginBottom: "10px" }}>
            Recommended Products:
          </h3>
          <ul style={{ color: "#5d4037", paddingLeft: "20px", margin: "0" }}>
            {recommendations.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      )}
      {ayurvedicInsights && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5dc",
            borderRadius: "8px",
            border: "1px solid #d7ccc8",
          }}
        >
          <h3 style={{ color: "#5d4037", fontSize: "18px", marginBottom: "10px" }}>
            Ayurvedic Insights:
          </h3>
          <p style={{ color: "#5d4037", margin: "0" }}>{ayurvedicInsights}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;