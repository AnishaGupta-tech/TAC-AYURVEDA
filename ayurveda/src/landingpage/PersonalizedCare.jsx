import React from "react";

const PersonalizedCare = () => {
  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#FFFFFF",
        color: "#1F2937",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "row", // Horizontal layout on larger screens
          alignItems: "center", // Vertically center content
          gap: "2rem",
          flexWrap: "wrap", // Allow wrapping on smaller screens
        }}
      >
        {/* Image Section */}
        <div
          style={{
            flex: 1,
            minWidth: "300px", // Ensure the image doesn't get too small
            position: "relative",
          }}
        >
          <img
            src="https://storage.googleapis.com/a1aa/image/9z1U6ADaEonSvbQh2pYSnKIfbNzdZCdu-1Xfn4IyESc.jpg" // Replace with an ayurvedic-themed image
            alt="Ayurvedic Doctor"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              style={{
                backgroundColor: "#FFFFFF",
                color: "#8B4513",
                borderRadius: "9999px",
                padding: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <i className="fas fa-play" style={{ fontSize: "1.5rem" }}></i>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div
          style={{
            flex: 1,
            minWidth: "300px", // Ensure the content doesn't get too small
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                backgroundColor: "#F5DEB3",
                color: "#8B4513",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
              }}
            >
              About Us
            </span>
          </div>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              lineHeight: "1.2",
            }}
          >
            <span style={{ color: "#1F2937" }}>Personalized,</span>{" "}
            <span style={{ color: "#8B4513" }}>Exceptional</span>{" "}
            <span style={{ color: "#1F2937" }}>Care</span>
          </h1>
          <p style={{ color: "#4B5563" }}>
            Providing the Highest Quality of Care and Comfort, Created Especially for Your Health,
            Safety, and Peace of Mind
          </p>

          {/* Features Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <div
                style={{
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.75rem",
                  borderRadius: "9999px",
                }}
              >
                <i className="fas fa-flask" style={{ fontSize: "1.25rem" }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1F2937" }}>
                  Research and Development
                </h3>
                <p style={{ color: "#4B5563" }}>
                  At TAC Ayurveda, our R&D team drives innovation to improve health and
                  well-being through traditional and modern ayurvedic solutions.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <div
                style={{
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.75rem",
                  borderRadius: "9999px",
                }}
              >
                <i className="fas fa-leaf" style={{ fontSize: "1.25rem" }}></i> {/* Changed icon */}
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1F2937" }}>
                  Natural Healing Therapies
                </h3>
                <p style={{ color: "#4B5563" }}>
                  Utilizing traditional ayurvedic therapies and natural remedies to ensure holistic
                  healing and wellness tailored to individual needs.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            style={{
              backgroundColor: "#8B4513",
              color: "#FFFFFF",
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              alignSelf: "flex-start",
            }}
          >
            View all <i className="fas fa-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedCare;