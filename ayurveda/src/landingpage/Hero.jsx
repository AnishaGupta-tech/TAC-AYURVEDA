import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#FFFFFF" }}>
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          
          <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#8B4513" }}>
            TAC Ayurveda
          </span>
        </div>
        <nav style={{ display: "flex", gap: "1.5rem", color: "#4B5563" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none", hover: { color: "#A0522D" } }}>
            Home
          </a>
          <a href="https://theayurvedaco.com/?srsltid=AfmBOopyns51egEY-3Y9zvP3TtNRgqQd9a3jfVRFLLuOEA8udn4ZBJLJ" style={{ color: "inherit", textDecoration: "none", hover: { color: "#A0522D" } }}>
            About us
          </a>
          <Link to="/advanced-diagnostics" style={{ color: "inherit", textDecoration: "none", hover: { color: "#A0522D" } }}>
            Advance Diagnostics
          </Link>
          <Link to="/doctor-consultation" style={{ color: "inherit", textDecoration: "none", hover: { color: "#A0522D" } }}>
            Consult
          </Link>
          <Link to="https://theayurvedaco.com/?srsltid=AfmBOorrMZbDUhXLvZxuduyLvT2oXA4o8wxk3TD_INm0CdfFOHFJnWkP" style={{ color: "inherit", textDecoration: "none", hover: { color: "#A0522D" } }}>
            Products
          </Link>
          <Link to="/guidance" style={{ color: "inherit", textDecoration: "none", hover: { color: "#A0522D" } }}>
            Guidance
          </Link>
        </nav>
        <button
          style={{
            backgroundColor: "#8B4513",
            color: "#FFFFFF",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Book Appointment
        </button>
      </header>

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
                backgroundColor: "#F5DEB3",
                color: "#8B4513",
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
                color: "#1F2937",
              }}
            >
              Your Wellness, <span style={{ color: "#8B4513" }}>Our Mission</span>
            </h1>
            <p style={{ color: "#4B5563" }}>
              We are dedicated to providing compassionate and professional healthcare services,
              tailored to meet your unique needs, so you can thrive and enjoy a healthier, more
              fulfilling life.
            </p>
            <button
              style={{
                backgroundColor: "#8B4513",
                color: "#FFFFFF",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
              }}
            >
              Learn More
            </button>
            <div style={{ display: "flex", gap: "2rem", paddingTop: "1.5rem" }}>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1F2937" }}>700+</h2>
                <p style={{ color: "#4B5563" }}>Patients served</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1F2937" }}>3M+</h2>
                <p style={{ color: "#4B5563" }}>Reports delivered</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1F2937" }}>150+</h2>
                <p style={{ color: "#4B5563" }}>Expert specialist</p>
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
                backgroundColor: "#FFFFFF",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#8B4513" }}>85%</h2>
                <p style={{ color: "#4B5563" }}>Successful diagnosis</p>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "25%",
                right: "0",
                backgroundColor: "#FFFFFF",
                padding: "0.5rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src="https://storage.googleapis.com/a1aa/image/ayurvedic-icon-1.png" // Replace with an ayurvedic-themed icon
                alt="Herb icon"
                style={{ width: "48px", height: "48px" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                backgroundColor: "#FFFFFF",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={{ color: "#4B5563" }}>Have a question?</p>
              <a
                href="mailto:info@tacayurveda.com"
                style={{ color: "#8B4513", textDecoration: "none" }}
              >
                info@tacayurveda.com
              </a>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "25%",
                right: "0",
                backgroundColor: "#FFFFFF",
                padding: "0.5rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src="https://storage.googleapis.com/a1aa/image/ayurvedic-icon-2.png" // Replace with an ayurvedic-themed icon
                alt="Ayurvedic Doctor icon"
                style={{ width: "48px", height: "48px" }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;