import React from "react";

const HealthBlogs = () => {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: "#F5F5DC" }}>
      {/* Health Blogs Section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
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
            Our latest news
          </span>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1F2937", marginTop: "0.5rem" }}>
            Check out our most recent health blogs.
          </h1>
        </div>

        {/* Blog Posts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Blog Post 1 */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <img
              src="https://placehold.co/600x400"
              alt="Doctor with a stethoscope"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Exercise & Fitness
              </span>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1F2937", marginBottom: "0.5rem" }}>
                The skincare routine that works: expert tips
              </h2>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>July 18, 2022</p>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <img
              src="https://placehold.co/600x400"
              alt="Doctor talking to a patient"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Mental Health
              </span>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1F2937", marginBottom: "0.5rem" }}>
                The art of managing business and patient.
              </h2>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Aug 26, 2024</p>
            </div>
          </div>

          {/* Blog Post 3 (CTA) */}
          <div
            style={{
              backgroundColor: "#8B4513",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#F5DEB3",
                  color: "#8B4513",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Children's Health
              </span>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "0.5rem" }}>
                Successful transitional rehab; more than just exercise
              </h2>
              <div style={{ color: "#FFFFFF", fontSize: "1.5rem" }}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* View All Posts Link */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
          <a
            href="#"
            style={{
              color: "#8B4513",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            View all Post <i className="fas fa-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{ backgroundColor: "#1F2937", color: "#FFFFFF", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Get in Touch */}
            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
                Get in touch
              </h3>
              <p style={{ marginBottom: "0.5rem" }}>Call us</p>
              <p style={{ marginBottom: "0.5rem" }}>08122445902</p>
              <p style={{ marginBottom: "0.5rem" }}>Opening time</p>
              <p style={{ marginBottom: "0.5rem" }}>Mon-sat: 24 hours</p>
            </div>

            {/* Our Services */}
            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
                Our services
              </h3>
              <ul>
                {["Orthopedics", "Neurology", "Eye care", "Dermatology", "Dental"].map(
                  (service) => (
                  <li key={service} style={{ marginBottom: "0.5rem" }}>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
                Useful links
              </h3>
              <ul>
                {["About us", "Appointment", "Patient info", "Testimonial"].map(
                  (link) => (
                  <li key={link} style={{ marginBottom: "0.5rem" }}>
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* App Stores and Social Media */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Store"
                  style={{ width: "150px", marginBottom: "0.5rem" }}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/67/Download_on_the_App_Store_Badge.svg"
                  alt="Apple App Store"
                  style={{ width: "150px" }}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {["fab fa-facebook-f", "fab fa-twitter", "fab fa-instagram", "fab fa-linkedin-in"].map(
                  (icon) => (
                  <a
                    key={icon}
                    href="#"
                    style={{ color: "#FFFFFF", fontSize: "1.25rem" }}
                  >
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthBlogs;