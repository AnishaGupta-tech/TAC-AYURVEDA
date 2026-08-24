import React, { useState, useEffect } from "react";

// Map temperature (°C) to a dosha-balancing seasonal recommendation
function doshaGuidanceFor(tempC, weatherCode) {
  const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode);
  if (isRainy) {
    return {
      dosha: "Vata",
      tip: "Rainy conditions aggravate Vata — favor warm, oily, grounding foods, sesame oil self-massage, and staying warm and dry.",
    };
  }
  if (tempC >= 30) {
    return {
      dosha: "Pitta",
      tip: "High heat aggravates Pitta — favor cooling foods (cucumber, coconut, mint), avoid excess sun, and stay hydrated.",
    };
  }
  if (tempC <= 15) {
    return {
      dosha: "Kapha/Vata",
      tip: "Cold weather aggravates Vata and Kapha — favor warm, spiced, cooked meals, dry brushing, and gentle daily movement.",
    };
  }
  return {
    dosha: "Balanced",
    tip: "Mild conditions today — a great time for balanced routines: moderate exercise, seasonal produce, and regular sleep.",
  };
}

const GuidancePage = () => {
  const [guidance, setGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Simulated data (replace with API call)
  const simulatedGuidance = [
    {
      id: 1,
      title: "Daily Ayurvedic Routine (Dinacharya)",
      description:
        "Start your day with a warm glass of water, followed by oil pulling and Abhyanga (self-massage). Practice yoga and meditation to balance your doshas.",
      image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=600&auto=format&fit=crop",
      link: "/daily-routine",
      fullText:
        "Dinacharya aligns your body with nature's cycles. Wake before sunrise (Brahma Muhurta), scrape your tongue, and drink warm water to kindle Agni. Abhyanga with warm sesame or coconut oil improves circulation and calms Vata, while a short Surya Namaskar sequence and 5-10 minutes of quiet breathing set a steady tone for the day.",
    },
    {
      id: 2,
      title: "Ayurvedic Diet Tips",
      description:
        "Eat fresh, seasonal, and whole foods tailored to your dosha. Include all six tastes (sweet, sour, salty, bitter, pungent, astringent) in your meals.",
      image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=600&auto=format&fit=crop",
      link: "/diet-tips",
      fullText:
        "Make lunch your largest meal, when digestive fire peaks with the sun, and keep dinner light and early. Favor freshly cooked, warm food over cold or leftover meals, chew slowly, and avoid drinking large amounts of cold water with meals — it dilutes Agni. Vata does well with grounding, oily foods; Pitta with cooling, hydrating foods; Kapha with light, warming, and spiced foods.",
    },
    {
      id: 3,
      title: "Herbal Remedies for Stress",
      description:
        "Use adaptogenic herbs like Ashwagandha and Brahmi to reduce stress. Drink Tulsi tea daily and practice Pranayama (breathing exercises).",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
      link: "/stress-remedies",
      fullText:
        "Ashwagandha root supports the body's stress response and helps restore energy without overstimulation, while Brahmi supports mental clarity and calm focus. Pair a daily dose with 10 minutes of Nadi Shodhana (alternate-nostril breathing) in the evening, and a warm Shirodhara-style oil drip once a week can deeply relax an overactive Vata mind.",
    },
    {
      id: 4,
      title: "Boost Your Immunity Naturally",
      description:
        "Strengthen your immune system with Ayurvedic herbs like Giloy, Turmeric, and Chyawanprash. Stay hydrated and get adequate sleep.",
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop",
      link: "/immunity-boost",
      fullText:
        "Ojas — the subtle essence of vitality in Ayurveda — is built through good digestion, restful sleep, and nourishing food. A teaspoon of Chyawanprash each morning, Giloy juice to clear toxins (Ama), and warm turmeric milk at night are classic immunity boosters. Avoid excess sugar and processed food, which are believed to weaken Ojas over time.",
    },
    {
      id: 5,
      title: "Ayurvedic Skincare Secrets",
      description:
        "Use natural ingredients like Neem, Turmeric, and Sandalwood for glowing skin. Avoid harsh chemicals and follow a balanced diet.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
      link: "/skincare-secrets",
      fullText:
        "Skin reflects the balance of Pitta dosha, so cooling and purifying ingredients work best. A Neem and Turmeric face pack twice a week helps clarify skin, while a few drops of Sandalwood oil calm inflammation and redness. Internally, favor cooling foods like cucumber and coconut water, and limit fried, spicy, or excessively salty foods that aggravate Pitta.",
    },
    {
      id: 6,
      title: "Yoga for Dosha Balance",
      description:
        "Practice yoga poses tailored to your dosha. Vata: Gentle poses, Pitta: Cooling poses, Kapha: Energizing poses.",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=600&auto=format&fit=crop",
      link: "/yoga-dosha-balance",
      fullText:
        "Vata benefits from slow, grounding poses like Child's Pose and gentle forward folds practiced at a steady pace. Pitta thrives with cooling, less intense sequences — Moon Salutations and restorative poses — practiced in a cool space. Kapha benefits most from energizing, warming vinyasa flows and backbends that build heat and get circulation moving.",
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchGuidance = async () => {
      try {
        setGuidance(simulatedGuidance);
      } catch {
        setError("Failed to fetch guidance.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, []);

  // Live seasonal guidance powered by Open-Meteo (free, no API key required)
  useEffect(() => {
    const loadWeather = async (lat, lon, place) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        const data = await res.json();
        const tempC = data?.current?.temperature_2m;
        const code = data?.current?.weather_code;
        if (typeof tempC === "number") {
          setWeather({ tempC, place, ...doshaGuidanceFor(tempC, code) });
        }
      } catch {
        // Silently skip the widget if the free API is unreachable
      } finally {
        setWeatherLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadWeather(pos.coords.latitude, pos.coords.longitude, "your location"),
        () => loadWeather(28.6139, 77.209, "New Delhi"), // fallback: New Delhi
        { timeout: 5000 }
      );
    } else {
      loadWeather(28.6139, 77.209, "New Delhi");
    }
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading guidance...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.guidancePage} className="ayur-motif">
      <h1 style={styles.header}>🌿 Ayurvedic Guidance 🪷</h1>
      <p style={styles.subHeader}>
        Discover personalized Ayurvedic tips, remedies, and practices to enhance your well-being.
      </p>
      <div className="ayur-divider" aria-hidden="true" style={{ marginBottom: "24px" }}></div>

      {!weatherLoading && weather && (
        <div style={styles.weatherCard}>
          <div style={styles.weatherTemp}>{Math.round(weather.tempC)}°C</div>
          <div>
            <div style={styles.weatherDosha}>Today's dosha watch: {weather.dosha}</div>
            <p style={styles.weatherTip}>{weather.tip}</p>
            <p style={styles.weatherSource}>Live weather for {weather.place} · via Open-Meteo</p>
          </div>
        </div>
      )}

      <div style={styles.guidanceGrid}>
        {guidance.map((guide) => (
          <div
            key={guide.id}
            style={styles.guidanceCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(93, 64, 55, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img src={guide.image} alt={guide.title} style={styles.cardImage} />
            <h2 style={styles.cardTitle}>{guide.title}</h2>
            <p style={styles.cardDescription}>
              {expandedId === guide.id ? guide.fullText || guide.description : guide.description}
            </p>
            <button
              type="button"
              style={styles.cardButton}
              onClick={() => setExpandedId(expandedId === guide.id ? null : guide.id)}
            >
              {expandedId === guide.id ? "Show Less" : "Learn More"}
            </button>
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
    background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 60%)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "var(--font-sans)",
  },
  weatherCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary) 100%)",
    color: "var(--color-surface)",
    borderRadius: "14px",
    padding: "20px 24px",
    margin: "0 20px 30px",
    boxShadow: "0 8px 20px rgba(93, 64, 55, 0.25)",
  },
  weatherTemp: {
    fontSize: "2.75rem",
    fontWeight: "bold",
    lineHeight: 1,
  },
  weatherDosha: {
    fontSize: "1.1rem",
    fontWeight: "700",
    marginBottom: "4px",
  },
  weatherTip: {
    fontSize: "0.95rem",
    opacity: 0.95,
    marginBottom: "4px",
    lineHeight: 1.4,
  },
  weatherSource: {
    fontSize: "0.75rem",
    opacity: 0.75,
  },
  header: {
    textAlign: "center",
    color: "var(--color-primary)",
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontFamily: "var(--font-display)",
  },
  subHeader: {
    textAlign: "center",
    color: "var(--color-text-muted)",
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "var(--color-primary)",
    marginTop: "20px",
  },
  error: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "var(--color-primary)",
    marginTop: "20px",
  },
  guidanceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  guidanceCard: {
    background: "linear-gradient(160deg, var(--color-bg-alt) 0%, var(--color-border) 100%)",
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
    fontFamily: "var(--font-display)",
    color: "var(--color-primary)",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "var(--color-text-muted)",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  cardButton: {
    padding: "10px 20px",
    backgroundColor: "var(--color-primary)",
    color: "var(--color-surface)",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.3s ease",
  },
};

export default GuidancePage;