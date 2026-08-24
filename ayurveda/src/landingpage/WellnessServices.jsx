import React, { useState } from "react";

const WellnessServices = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      setStatus({ state: "error", error: "Please fill in all required fields." });
      return;
    }
    setStatus({ state: "submitting", error: "" });
    try {
      const response = await fetch(`${baseURL}/api/appointment-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit appointment request");
      }
      setStatus({ state: "success", error: "" });
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", error: err.message });
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)", backgroundColor: "var(--color-bg-alt)" }}>
      {/* Wellness Services Section */}
      <section
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ color: "var(--color-secondary-dark)", fontWeight: "600" }}>Shop by Category</span>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginTop: "0.5rem" }}>
              Begin your journey to{" "}
              <span style={{ color: "var(--color-secondary-dark)" }}>better health</span> with our wellness services.
            </h1>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "560px", margin: "0.75rem auto 0" }}>
              Explore herbs, oils, teas, and supplements organized by category — each rooted in
              traditional Ayurvedic practice and matched to real wellness concerns.
            </p>
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
                icon: "🌿",
                title: "Panchakarma",
                description:
                  "A traditional detoxification therapy that rejuvenates the body and mind.",
                doctors: "36+ Doctors",
              },
              {
                icon: "🌱",
                title: "Herbal Remedies",
                description:
                  "Natural herbal treatments tailored to your unique health needs.",
                doctors: "24+ Doctors",
              },
              {
                icon: "🧘",
                title: "Yoga Therapy",
                description:
                  "Customized yoga sessions to improve physical and mental well-being.",
                doctors: "30+ Doctors",
              },
              {
                icon: "🥗",
                title: "Ayurvedic Diet",
                description:
                  "Personalized diet plans based on your dosha for optimal health.",
                doctors: "45+ Doctors",
              },
              {
                icon: "🧠",
                title: "Stress Management",
                description:
                  "Holistic therapies to reduce stress and promote relaxation.",
                doctors: "35+ Doctors",
              },
              {
                icon: "❤️",
                title: "Heart Management",
                description:
                  "Holistic therapies to reduce heart rate and promote relaxation.",
                doctors: "35+ Doctors",
              },
            ].map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "var(--color-surface)",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                  <span
                    role="img"
                    aria-label={`${service.title} icon`}
                    style={{ width: "40px", height: "40px", marginRight: "0.75rem", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {service.icon}
                  </span>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{service.title}</h2>
                </div>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>{service.description}</p>
                <span style={{ color: "var(--color-secondary-dark)" }}>{service.doctors}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book An Appointment Section */}
      <section
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "3rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Book An Appointment</h2>
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
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
                backgroundColor: "var(--color-bg-alt)",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Your name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Your Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Phone number*
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Select service*
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="">Select service</option>
                    <option value="Panchakarma">Panchakarma</option>
                    <option value="Herbal Remedies">Herbal Remedies</option>
                    <option value="Yoga Therapy">Yoga Therapy</option>
                    <option value="Ayurvedic Diet">Ayurvedic Diet</option>
                    <option value="Stress Management">Stress Management</option>
                    <option value="Heart Management">Heart Management</option>
                  </select>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Message*
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                {status.state === "error" && (
                  <p style={{ color: "var(--color-danger)", marginBottom: "1rem" }}>{status.error}</p>
                )}
                {status.state === "success" && (
                  <p style={{ color: "var(--color-success)", marginBottom: "1rem" }}>
                    Thanks! We'll send you a confirmation within 24 hours.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status.state === "submitting"}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--color-secondary-dark)",
                    color: "var(--color-surface)",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {status.state === "submitting" ? "Booking..." : "Book Appointment"}{" "}
                  <i className="fas fa-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
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