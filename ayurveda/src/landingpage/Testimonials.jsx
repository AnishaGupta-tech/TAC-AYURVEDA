import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        backgroundColor: "var(--color-bg-alt)", // Light beige background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--space-xl) var(--space-md)",
      }}
    >
      <div className="section-heading">
        <h2>What Our Community Says</h2>
        <p>Real experiences from people on their Ayurvedic wellness journey.</p>
      </div>

      {/* Testimonial Cards Container */}
      <div
        ref={scrollRef}
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
              backgroundColor: "var(--color-surface)",
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
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with ayurvedic-themed image
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
                  backgroundColor: "var(--color-bg-alt)", // Light brown
                  color: "var(--color-secondary-dark)", // Dark brown
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Testimonials
              </div>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                "I've been using TAC Ayurveda for a few months, and I'm really happy with it! The treatments are holistic and effective. The herbal remedies and therapies have improved my overall health. I feel more energetic and balanced. I definitely recommend it to anyone looking for natural healing!"
              </p>
              <p style={{ fontWeight: "bold", color: "var(--color-text)" }}>Mobarak Isx</p>
              <p style={{ color: "var(--color-text-muted)" }}>Content creator</p>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
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
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with ayurvedic-themed image
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
                  backgroundColor: "var(--color-bg-alt)",
                  color: "var(--color-secondary-dark)",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Testimonials
              </div>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                "TAC Ayurveda has been a game-changer for me! The personalized treatments and natural remedies have helped me achieve my health goals. I highly recommend it to anyone looking for holistic healing."
              </p>
              <p style={{ fontWeight: "bold", color: "var(--color-text)" }}>Sarah Johnson</p>
              <p style={{ color: "var(--color-text-muted)" }}>Fitness Enthusiast</p>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with ayurvedic-themed image
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
                  backgroundColor: "var(--color-bg-alt)",
                  color: "var(--color-secondary-dark)",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Testimonials
              </div>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                "I love how TAC Ayurveda combines traditional wisdom with modern practices. The treatments are effective, and the team is very supportive. It's like having a personal healer!"
              </p>
              <p style={{ fontWeight: "bold", color: "var(--color-text)" }}>David Lee</p>
              <p style={{ color: "var(--color-text-muted)" }}>Health Blogger</p>
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
          onClick={() => scrollByAmount(-520)}
          style={{
            backgroundColor: "var(--color-secondary-dark)", // Brown
            color: "var(--color-surface)",
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
          onClick={() => scrollByAmount(520)}
          style={{
            backgroundColor: "var(--color-secondary-dark)", // Brown
            color: "var(--color-surface)",
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

      <Link
        to="/reviews"
        style={{
          marginTop: "var(--space-md)",
          color: "var(--color-primary)",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        View all reviews →
      </Link>
    </div>
  );
};

export default Testimonials;