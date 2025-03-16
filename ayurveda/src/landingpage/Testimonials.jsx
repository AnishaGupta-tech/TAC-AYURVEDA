import React from "react";

const Testimonials = () => {
  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#F5F5DC", // Light beige background
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {/* Testimonial Cards Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          overflowX: "auto", // Horizontal scroll
          paddingBottom: "1rem", // Space for scrollbar
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            padding: "1rem",
          }}
        >
          {/* Testimonial Card 1 */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "1.5rem",
              minWidth: "500px", // Ensure cards don't shrink too much
            }}
          >
            {/* Image */}
            <img
              src="https://storage.googleapis.com/a1aa/image/ayurvedic-patient-1.jpg" // Replace with ayurvedic-themed image
              alt="Ayurvedic patient"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover",
                marginRight: "1.5rem",
              }}
            />

            {/* Testimonial Content */}
            <div>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#F5DEB3", // Light brown
                  color: "#8B4513", // Dark brown
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Testimonials
              </div>
              <p style={{ color: "#4B5563", marginBottom: "1rem" }}>
                "I've been using TAC Ayurveda for a few months, and I'm really happy with it! The treatments are holistic and effective. The herbal remedies and therapies have improved my overall health. I feel more energetic and balanced. I definitely recommend it to anyone looking for natural healing!"
              </p>
              <p style={{ fontWeight: "bold", color: "#1F2937" }}>Mobarak Isx</p>
              <p style={{ color: "#6B7280" }}>Content creator</p>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "1.5rem",
              minWidth: "500px",
            }}
          >
            {/* Image */}
            <img
              src="https://storage.googleapis.com/a1aa/image/ayurvedic-patient-2.jpg" // Replace with ayurvedic-themed image
              alt="Ayurvedic patient"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover",
                marginRight: "1.5rem",
              }}
            />

            {/* Testimonial Content */}
            <div>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Testimonials
              </div>
              <p style={{ color: "#4B5563", marginBottom: "1rem" }}>
                "TAC Ayurveda has been a game-changer for me! The personalized treatments and natural remedies have helped me achieve my health goals. I highly recommend it to anyone looking for holistic healing."
              </p>
              <p style={{ fontWeight: "bold", color: "#1F2937" }}>Sarah Johnson</p>
              <p style={{ color: "#6B7280" }}>Fitness Enthusiast</p>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "1.5rem",
              minWidth: "500px",
            }}
          >
            {/* Image */}
            <img
              src="https://storage.googleapis.com/a1aa/image/ayurvedic-patient-3.jpg" // Replace with ayurvedic-themed image
              alt="Ayurvedic patient"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover",
                marginRight: "1.5rem",
              }}
            />

            {/* Testimonial Content */}
            <div>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Testimonials
              </div>
              <p style={{ color: "#4B5563", marginBottom: "1rem" }}>
                "I love how TAC Ayurveda combines traditional wisdom with modern practices. The treatments are effective, and the team is very supportive. It's like having a personal healer!"
              </p>
              <p style={{ fontWeight: "bold", color: "#1F2937" }}>David Lee</p>
              <p style={{ color: "#6B7280" }}>Health Blogger</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <button
          style={{
            backgroundColor: "#8B4513", // Brown
            color: "#FFFFFF",
            borderRadius: "9999px",
            padding: "0.75rem",
            margin: "0 0.5rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button
          style={{
            backgroundColor: "#8B4513", // Brown
            color: "#FFFFFF",
            borderRadius: "9999px",
            padding: "0.75rem",
            margin: "0 0.5rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;