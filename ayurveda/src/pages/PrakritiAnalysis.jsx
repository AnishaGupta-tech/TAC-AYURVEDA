import React, { useState } from "react";
import PageBanner from "../components/PageBanner";

const PrakritiAnalysis = () => {
  const [answers, setAnswers] = useState({});
  const [prakritiType, setPrakritiType] = useState("");

  // Questions to determine Prakriti
  const questions = [
    { id: 1, text: "Do you often feel cold?", dosha: { yes: "Vata", no: "Pitta/Kapha" } },
    { id: 2, text: "Do you have a fast metabolism?", dosha: { yes: "Vata/Pitta", no: "Kapha" } },
    { id: 3, text: "Do you tend to gain weight easily?", dosha: { yes: "Kapha", no: "Vata/Pitta" } },
    { id: 4, text: "Is your skin dry or rough?", dosha: { yes: "Vata", no: "Pitta/Kapha" } },
    { id: 5, text: "Do you have a strong appetite?", dosha: { yes: "Pitta", no: "Vata/Kapha" } },
    { id: 6, text: "Do you feel sluggish or heavy?", dosha: { yes: "Kapha", no: "Vata/Pitta" } },
    { id: 7, text: "Are you often anxious or restless?", dosha: { yes: "Vata", no: "Pitta/Kapha" } },
    { id: 8, text: "Do you get angry easily?", dosha: { yes: "Pitta", no: "Vata/Kapha" } },
    { id: 9, text: "Do you have a calm and steady personality?", dosha: { yes: "Kapha", no: "Vata/Pitta" } },
  ];

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate Prakriti based on answers
    const doshaCount = { Vata: 0, Pitta: 0, Kapha: 0 };

    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer === "Yes") {
        const dosha = question.dosha.yes.split("/");
        dosha.forEach((d) => doshaCount[d]++);
      } else if (answer === "No") {
        const dosha = question.dosha.no.split("/");
        dosha.forEach((d) => doshaCount[d]++);
      }
    });

    // Determine the dominant Prakriti
    const maxCount = Math.max(...Object.values(doshaCount));
    const dominantDoshas = Object.keys(doshaCount).filter((d) => doshaCount[d] === maxCount);

    // Set the Prakriti type
    if (dominantDoshas.length === 1) {
      setPrakritiType(`Your Ayurvedic body type is: ${dominantDoshas[0]}`);
    } else {
      setPrakritiType(`Your Ayurvedic body type is a combination of: ${dominantDoshas.join(" and ")}`);
    }
  };

  return (
    <div>
      <PageBanner
        title="Prakriti Analysis"
        subtitle="Answer a short questionnaire to discover your unique Ayurvedic body type."
        image="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1200&auto=format&fit=crop"
      />
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "var(--color-surface)",
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "var(--font-sans)",
        color: "var(--color-text)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "var(--color-primary)",
          fontSize: "24px",
          marginBottom: "10px",
        }}
      >
        🌿 Prakriti Analysis
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "var(--color-text-muted)",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        Answer the following questions to discover your Ayurvedic body type (Vata, Pitta, Kapha, or a combination).
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {questions.map((question, index) => (
          <div
            key={question.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p style={{ margin: "0", fontSize: "16px", color: "var(--color-primary)" }}>{question.text}</p>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => handleAnswer(index, "Yes")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: answers[index] === "Yes" ? "var(--color-primary)" : "var(--color-border)",
                  color: answers[index] === "Yes" ? "var(--color-surface)" : "var(--color-text)",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(index, "No")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: answers[index] === "No" ? "var(--color-primary)" : "var(--color-border)",
                  color: answers[index] === "No" ? "var(--color-surface)" : "var(--color-text)",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
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
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-surface)",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginTop: "10px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary-dark)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
        >
          Analyze
        </button>
      </form>
      {prakritiType && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "var(--color-bg-alt)",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 style={{ color: "var(--color-primary)", fontSize: "18px", marginBottom: "10px" }}>
            Your Prakriti Analysis:
          </h3>
          <p style={{ color: "var(--color-primary)", margin: "0" }}>{prakritiType}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default PrakritiAnalysis;