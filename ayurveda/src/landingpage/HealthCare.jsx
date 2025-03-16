import React from "react";

const HealthCare = () => {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#F5F5DC" }}>
      {/* Why Choose Us Section */}
      <section style={{ padding: "3rem 1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#F5DEB3",
                color: "#8B4513",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
              }}
            >
              Why choose us
            </span>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", marginTop: "1rem" }}>
              Why Pick Us for{" "}
              <span style={{ color: "#8B4513" }}>Your Health Care</span>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {/* Left Side: Service Cards */}
            <div style={{ flex: 1, minWidth: "300px", padding: "1rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    icon: "fas fa-user-md",
                    title: "More experience",
                    description: "We offer a range of health services to meet all your needs.",
                  },
                  {
                    icon: "fas fa-heartbeat",
                    title: "Seamless care",
                    description: "We offer a range of health services to meet all your needs.",
                  },
                  {
                    icon: "fas fa-question-circle",
                    title: "The right answers?",
                    description: "We offer a range of health services to meet all your needs.",
                  },
                  {
                    icon: "fas fa-award",
                    title: "Unparalleled expertise",
                    description: "We offer a range of health services to meet all your needs.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      padding: "1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div
                        style={{
                          backgroundColor: "#8B4513",
                          color: "#FFFFFF",
                          borderRadius: "9999px",
                          padding: "0.75rem",
                        }}
                      >
                        <i className={service.icon} style={{ fontSize: "1.25rem" }}></i>
                      </div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginLeft: "1rem" }}>
                        {service.title}
                      </h3>
                    </div>
                    <p style={{ color: "#4B5563" }}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Image */}
            <div style={{ flex: 1, minWidth: "300px", padding: "1rem" }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with an ayurvedic-themed image
                alt="Ayurvedic Doctor"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section style={{ padding: "3rem 1rem", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#F5DEB3",
                color: "#8B4513",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
              }}
            >
              Meet our team
            </span>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", marginTop: "1rem" }}>
              Experienced and{" "}
              <span style={{ color: "#8B4513" }}>Skilled Team</span> of Experts
            </h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "flex", gap: "1rem", paddingBottom: "1rem" }}>
              {[
                {
                  image: "https://plus.unsplash.com/premium_photo-1661551577028-80cfb8e4d236?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with ayurvedic-themed images
                  name: "Dr. James Roberts",
                  role: "Certified Ayurvedic Specialist",
                },
                {
                  image: "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  name: "Dr. Emily Clark",
                  role: "Experienced Ayurvedic Practitioner",
                },
                {
                  image: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  name: "Dr. Michael Thompson",
                  role: "Skilled Panchakarma Expert",
                },
                {
                  image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  name: "Dr. David Lee",
                  role: "Trusted Ayurvedic Consultant",
                },
                {
                  image: "https://storage.googleapis.com/a1aa/image/ayurvedic-doctor-5.jpg",
                  name: "Dr. Sarah Johnson",
                  role: "Expert Ayurvedic Nutritionist",
                },
                {
                  image: "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  name: "Dr. William Brown",
                  role: "Renowned Ayurvedic Surgeon",
                },
                {
                  image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  name: "Dr. Linda Green",
                  role: "Ayurvedic Pediatric Specialist",
                },
                {
                  image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  name: "Dr. Robert White",
                  role: "Orthopedic Ayurvedic Expert",
                },
              ].map((doctor, index) => (
                <div
                  key={index}
                  style={{
                    flex: "0 0 auto",
                    width: "250px",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      padding: "1.5rem",
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "9999px",
                        margin: "0 auto 1rem",
                      }}
                    />
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{doctor.name}</h3>
                    <p style={{ color: "#4B5563", marginTop: "0.5rem" }}>{doctor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthCare;