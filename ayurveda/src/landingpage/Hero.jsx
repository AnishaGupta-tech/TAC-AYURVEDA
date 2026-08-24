import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "var(--font-sans)", backgroundColor: "var(--color-surface)" }}>
      {/* Main Content Section */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem",
          paddingTop: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Horizontal layout
            alignItems: "center", // Vertically center content
            gap: "3rem",
          }}
        >
          {/* Left Side Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start" }}>
            <div
              style={{
                backgroundColor: "var(--color-bg-alt)",
                color: "var(--color-secondary-dark)",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                display: "inline-block",
                fontSize: "0.75rem",
              }}
            >
              <i className="fas fa-heartbeat" style={{ marginRight: "0.5rem" }}></i>
              Solutions for better health
            </div>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "var(--color-text)",
              }}
            >
              Your Wellness, <span style={{ color: "var(--color-secondary-dark)" }}>Our Mission</span>
            </h1>
            <p style={{ color: "var(--color-text-muted)" }}>
              We are dedicated to providing compassionate and professional healthcare services,
              tailored to meet your unique needs, so you can thrive and enjoy a healthier, more
              fulfilling life.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => navigate("/products")}
                style={{
                  backgroundColor: "var(--color-secondary-dark)",
                  color: "var(--color-surface)",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate("/doctor-consultation")}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-primary)",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  border: "2px solid var(--color-primary)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Consult Vaidya
              </button>
            </div>
            <div style={{ display: "flex", gap: "6px", paddingTop: "0.25rem" }} aria-hidden="true">
              <span style={{ width: 22, height: 4, borderRadius: 2, backgroundColor: "var(--color-secondary-dark)" }} />
              <span style={{ width: 8, height: 4, borderRadius: 2, backgroundColor: "var(--color-border)" }} />
              <span style={{ width: 8, height: 4, borderRadius: 2, backgroundColor: "var(--color-border)" }} />
            </div>
            <div style={{ display: "flex", gap: "2rem", paddingTop: "1.5rem" }}>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "var(--color-text)" }}>700+</h2>
                <p style={{ color: "var(--color-text-muted)" }}>Patients served</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "var(--color-text)" }}>3M+</h2>
                <p style={{ color: "var(--color-text-muted)" }}>Reports delivered</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "var(--color-text)" }}>150+</h2>
                <p style={{ color: "var(--color-text-muted)" }}>Expert specialist</p>
              </div>
            </div>
          </div>

          {/* Right Side Content (Image) */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end", // Align image to the right
              position: "relative",
            }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1682098137061-37ad1237ce57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with an ayurvedic-themed image
              alt="Ayurvedic Doctor"
              style={{ width: "600px", height: "auto", borderRadius: "10px" }}
            />
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "var(--color-surface)",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "var(--color-secondary-dark)" }}>85%</h2>
                <p style={{ color: "var(--color-text-muted)" }}>Successful diagnosis</p>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "25%",
                right: "0",
                backgroundColor: "var(--color-surface)",
                padding: "0.5rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                role="img"
                aria-label="Herb icon"
                style={{ width: "48px", height: "48px", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                🌿
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                backgroundColor: "var(--color-surface)",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={{ color: "var(--color-text-muted)" }}>Have a question?</p>
              <a
                href="mailto:info@tacayurveda.com"
                style={{ color: "var(--color-secondary-dark)", textDecoration: "none" }}
              >
                info@tacayurveda.com
              </a>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "25%",
                right: "0",
                backgroundColor: "var(--color-surface)",
                padding: "0.5rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                role="img"
                aria-label="Ayurvedic Doctor icon"
                style={{ width: "48px", height: "48px", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                🩺
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;