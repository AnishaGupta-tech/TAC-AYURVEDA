import React, { useState, useEffect } from "react";

const GuidancePage = () => {
  const [guidance, setGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated data (replace with API call)
  const simulatedGuidance = [
    {
      id: 1,
      title: "Daily Ayurvedic Routine (Dinacharya)",
      description:
        "Start your day with a warm glass of water, followed by oil pulling and Abhyanga (self-massage). Practice yoga and meditation to balance your doshas.",
      image: "https://via.placeholder.com/300x200?text=Daily+Routine",
      link: "/daily-routine",
    },
    {
      id: 2,
      title: "Ayurvedic Diet Tips",
      description:
        "Eat fresh, seasonal, and whole foods tailored to your dosha. Include all six tastes (sweet, sour, salty, bitter, pungent, astringent) in your meals.",
      image: "https://via.placeholder.com/300x200?text=Diet+Tips",
      link: "/diet-tips",
    },
    {
      id: 3,
      title: "Herbal Remedies for Stress",
      description:
        "Use adaptogenic herbs like Ashwagandha and Brahmi to reduce stress. Drink Tulsi tea daily and practice Pranayama (breathing exercises).",
      image: "https://via.placeholder.com/300x200?text=Stress+Remedies",
      link: "/stress-remedies",
    },
    {
      id: 4,
      title: "Boost Your Immunity Naturally",
      description:
        "Strengthen your immune system with Ayurvedic herbs like Giloy, Turmeric, and Chyawanprash. Stay hydrated and get adequate sleep.",
      image: "https://via.placeholder.com/300x200?text=Immunity+Boost",
      link: "/immunity-boost",
    },
    {
      id: 5,
      title: "Ayurvedic Skincare Secrets",
      description:
        "Use natural ingredients like Neem, Turmeric, and Sandalwood for glowing skin. Avoid harsh chemicals and follow a balanced diet.",
      image: "https://via.placeholder.com/300x200?text=Skincare+Secrets",
      link: "/skincare-secrets",
    },
    {
      id: 6,
      title: "Yoga for Dosha Balance",
      description:
        "Practice yoga poses tailored to your dosha. Vata: Gentle poses, Pitta: Cooling poses, Kapha: Energizing poses.",
      image: "https://via.placeholder.com/300x200?text=Yoga+for+Doshas",
      link: "/yoga-dosha-balance",
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchGuidance = async () => {
      try {
        setGuidance(simulatedGuidance);
      } catch (err) {
        setError("Failed to fetch guidance.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading guidance...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.guidancePage}>
      <h1 style={styles.header}>🌿 Ayurvedic Guidance</h1>
      <p style={styles.subHeader}>
        Discover personalized Ayurvedic tips, remedies, and practices to enhance your well-being.
      </p>
      <div style={styles.guidanceGrid}>
        {guidance.map((guide) => (
          <div key={guide.id} style={styles.guidanceCard}>
            <img src={guide.image} alt={guide.title} style={styles.cardImage} />
            <h2 style={styles.cardTitle}>{guide.title}</h2>
            <p style={styles.cardDescription}>{guide.description}</p>
            <a href={guide.link} style={styles.cardButton}>
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  guidancePage: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#5d4037",
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontFamily: "Georgia, serif",
  },
  subHeader: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#5d4037",
    marginTop: "20px",
  },
  error: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#5d4037",
    marginTop: "20px",
  },
  guidanceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  guidanceCard: {
    backgroundColor: "#f5f5dc",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#5d4037",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#666",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  cardButton: {
    padding: "10px 20px",
    backgroundColor: "#5d4037",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.3s ease",
  },
};

export default GuidancePage;