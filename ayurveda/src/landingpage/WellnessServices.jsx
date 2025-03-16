import React from "react";

const WellnessServices = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F5F5DC" }}>
      {/* Wellness Services Section */}
      <section
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ color: "#8B4513", fontWeight: "600" }}>Our service</span>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginTop: "0.5rem" }}>
              Begin your journey to{" "}
              <span style={{ color: "#8B4513" }}>better health</span> with our wellness services.
            </h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Service Cards */}
            {[
              {
                icon: "https://storage.googleapis.com/a1aa/image/ayurvedic-icon-1.png", // Replace with ayurvedic-themed icon
                title: "Panchakarma",
                description:
                  "A traditional detoxification therapy that rejuvenates the body and mind.",
                doctors: "36+ Doctors",
              },
              {
                icon: "https://storage.googleapis.com/a1aa/image/ayurvedic-icon-2.png", // Replace with ayurvedic-themed icon
                title: "Herbal Remedies",
                description:
                  "Natural herbal treatments tailored to your unique health needs.",
                doctors: "24+ Doctors",
              },
              {
                icon: "https://storage.googleapis.com/a1aa/image/ayurvedic-icon-3.png", // Replace with ayurvedic-themed icon
                title: "Yoga Therapy",
                description:
                  "Customized yoga sessions to improve physical and mental well-being.",
                doctors: "30+ Doctors",
              },
              {
                icon: "https://storage.googleapis.com/a1aa/image/ayurvedic-icon-4.png", // Replace with ayurvedic-themed icon
                title: "Ayurvedic Diet",
                description:
                  "Personalized diet plans based on your dosha for optimal health.",
                doctors: "45+ Doctors",
              },
              {
                icon: "https://storage.googleapis.com/a1aa/image/ayurvedic-icon-5.png", // Replace with ayurvedic-themed icon
                title: "Stress Management",
                description:
                  "Holistic therapies to reduce stress and promote relaxation.",
                doctors: "35+ Doctors",
              },
              {
                icon: "https://storage.googleapis.com/a1aa/image/ayurvedic-icon-5.png", // Replace with ayurvedic-themed icon
                title: "Heart Management",
                description:
                  "Holistic therapies to reduce heart rate and promote relaxation.",
                doctors: "35+ Doctors",
              },
            ].map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                  <img
                    src={service.icon}
                    alt={`${service.title} icon`}
                    style={{ width: "40px", height: "40px", marginRight: "0.75rem" }}
                  />
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{service.title}</h2>
                </div>
                <p style={{ color: "#4B5563", marginBottom: "1rem" }}>{service.description}</p>
                <span style={{ color: "#8B4513" }}>{service.doctors}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book An Appointment Section */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "3rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Book An Appointment</h2>
            <p style={{ color: "#4B5563", marginTop: "0.5rem" }}>
              We will send you a confirmation within 24 hours.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Appointment Form */}
            <div
              style={{
                backgroundColor: "#F5F5DC",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <form>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#1F2937", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Your name*
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#1F2937", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Your Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#1F2937", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Phone number*
                  </label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#1F2937", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Select service*
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                    }}
                  >
                    <option>Select service</option>
                  </select>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#1F2937", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Message*
                  </label>
                  <textarea
                    placeholder="Message"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#8B4513",
                    color: "#FFFFFF",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  View all <i className="fas fa-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
                </button>
              </form>
            </div>

            {/* Appointment Image */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with ayurvedic-themed image
                alt="Ayurvedic Doctor"
                style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessServices;