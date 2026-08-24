import React from "react";
import { Link } from "react-router-dom";

const HealthBlogs = () => {
  return (
    <div style={{ fontFamily: "var(--font-sans)", backgroundColor: "var(--color-bg-alt)" }}>
      {/* Health Blogs Section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-bg-alt)",
              color: "var(--color-secondary-dark)",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
            }}
          >
            Our latest news
          </span>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "var(--color-text)", marginTop: "0.5rem" }}>
            Check out our most recent health blogs.
          </h1>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "560px", margin: "0.75rem auto 0" }}>
            Practical Ayurvedic insights on diet, lifestyle, and natural remedies, written to help
            you apply ancient wisdom to everyday wellness.
          </p>
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
              backgroundColor: "var(--color-surface)",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1521146250551-a5578dcc2e64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Doctor with a stethoscope"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--color-bg-alt)",
                  color: "var(--color-secondary-dark)",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Exercise & Fitness
              </span>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "var(--color-text)", marginBottom: "0.5rem" }}>
                The skincare routine that works: expert tips
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>July 18, 2022</p>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1683134386851-daff99d8abef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Doctor talking to a patient"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--color-bg-alt)",
                  color: "var(--color-secondary-dark)",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Mental Health
              </span>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "var(--color-text)", marginBottom: "0.5rem" }}>
                The art of managing business and patient.
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Aug 26, 2024</p>
            </div>
          </div>

          {/* Blog Post 3 (CTA) */}
          <div
            style={{
              backgroundColor: "var(--color-secondary-dark)",
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
                  backgroundColor: "var(--color-bg-alt)",
                  color: "var(--color-secondary-dark)",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Children's Health
              </span>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "var(--color-surface)", marginBottom: "0.5rem" }}>
                Successful transitional rehab; more than just exercise
              </h2>
              <div style={{ color: "var(--color-surface)", fontSize: "1.5rem" }}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* View All Posts Link */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
          <Link
            to="/guidance"
            style={{
              color: "var(--color-secondary-dark)",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            View all Post <i className="fas fa-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthBlogs;