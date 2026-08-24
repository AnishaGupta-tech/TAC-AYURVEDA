import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const AuthPage = () => {
  const location = useLocation();
  const redirectReason = location.state?.redirectReason;
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setErrors({});

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { full_name: formData.name } },
        });
        if (error) throw error;
      }
      navigate("/");
    } catch (err) {
      setErrors({ form: err.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page" style={styles.page}>
      <div style={styles.panel}>
        <div style={styles.panelOverlay} />
        <div style={styles.panelContent}>
          <span style={styles.panelBrand}>🌿 AyurSphere</span>
          <h1 style={styles.panelHeading}>
            Ancient wisdom, <br />
            <span style={{ color: "var(--color-secondary-light)" }}>guided by AI</span>
          </h1>
          <p style={styles.panelText}>
            Sign in to save your cart, track your orders, and get wellness guidance tailored
            to your unique constitution.
          </p>
          <ul style={styles.panelList}>
            <li>🪷 Personalized Prakriti &amp; dosha insights</li>
            <li>🛒 A cart and order history saved to your account</li>
            <li>👨‍⚕️ Book real consultations with certified Vaidyas</li>
          </ul>
        </div>
      </div>

      <div style={styles.formSide}>
        <div style={styles.card}>
          <div style={styles.tabs}>
            <button
              type="button"
              style={isLogin ? styles.tabActive : styles.tab}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              type="button"
              style={!isLogin ? styles.tabActive : styles.tab}
              onClick={() => setIsLogin(false)}
            >
              Create Account
            </button>
          </div>

          <h2 style={styles.header}>{isLogin ? "Welcome back" : "Join AyurSphere"}</h2>
          <p style={styles.subheader}>
            {isLogin
              ? "Sign in to continue your wellness journey."
              : "Create a free account to get started."}
          </p>

          {redirectReason && <p style={styles.redirectBanner}>{redirectReason}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            {!isLogin && (
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g. Priya Sharma"
                  autoComplete="name"
                />
                {errors.name && <p style={styles.errorText}>{errors.name}</p>}
              </div>
            )}

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.passwordWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ ...styles.input, paddingRight: "3rem" }}
                  placeholder="At least 6 characters"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={styles.passwordToggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p style={styles.errorText}>{errors.password}</p>}
            </div>

            {errors.form && <p style={styles.errorText}>{errors.form}</p>}

            <button type="submit" style={styles.button} disabled={submitting}>
              {submitting ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    minHeight: "calc(100vh - 320px)",
    fontFamily: "var(--font-sans)",
  },
  panel: {
    position: "relative",
    flex: "1 1 42%",
    minHeight: "420px",
    backgroundImage:
      "linear-gradient(160deg, rgba(31,58,36,0.82) 0%, rgba(31,58,36,0.55) 100%), url('https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    display: "flex",
    alignItems: "center",
    padding: "3rem",
  },
  panelOverlay: {
    display: "none",
  },
  panelContent: {
    position: "relative",
    color: "#fff",
    maxWidth: "420px",
  },
  panelBrand: {
    fontFamily: "var(--font-display)",
    fontSize: "1.4rem",
    fontWeight: 700,
  },
  panelHeading: {
    fontFamily: "var(--font-display)",
    fontSize: "2.4rem",
    lineHeight: 1.2,
    margin: "1.25rem 0 0.75rem",
  },
  panelText: {
    fontSize: "1.05rem",
    opacity: 0.92,
    lineHeight: 1.6,
  },
  panelList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    fontSize: "0.95rem",
    opacity: 0.95,
  },
  formSide: {
    flex: "1 1 58%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-bg)",
    padding: "3rem 1.5rem",
  },
  card: {
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    padding: "2.25rem",
    width: "100%",
    maxWidth: "420px",
  },
  tabs: {
    display: "flex",
    backgroundColor: "var(--color-bg-alt)",
    borderRadius: "9999px",
    padding: "4px",
    marginBottom: "1.75rem",
  },
  tab: {
    flex: 1,
    padding: "0.55rem 0",
    border: "none",
    background: "transparent",
    color: "var(--color-text-muted)",
    fontWeight: 600,
    fontSize: "0.9rem",
    borderRadius: "9999px",
    cursor: "pointer",
  },
  tabActive: {
    flex: 1,
    padding: "0.55rem 0",
    border: "none",
    backgroundColor: "var(--color-primary)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.9rem",
    borderRadius: "9999px",
    cursor: "pointer",
  },
  header: {
    color: "var(--color-text)",
    fontFamily: "var(--font-display)",
    fontSize: "1.75rem",
    marginBottom: "0.35rem",
  },
  subheader: {
    color: "var(--color-text-muted)",
    fontSize: "0.95rem",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
  },
  label: {
    color: "var(--color-text)",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  input: {
    padding: "0.75rem 0.9rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border)",
    fontSize: "1rem",
    outline: "none",
    fontFamily: "var(--font-sans)",
    backgroundColor: "var(--color-bg)",
  },
  passwordWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordToggle: {
    position: "absolute",
    right: "0.6rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    padding: "0.25rem",
    lineHeight: 1,
  },
  button: {
    padding: "0.8rem",
    borderRadius: "var(--radius-sm)",
    border: "none",
    backgroundColor: "var(--color-primary)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
    transition: "background-color 0.2s ease, transform 0.15s ease",
    marginTop: "0.25rem",
  },
  toggleText: {
    color: "var(--color-text-muted)",
    fontSize: "0.9rem",
    marginTop: "1.5rem",
    textAlign: "center",
  },
  toggleButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "var(--color-primary)",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "0.9rem",
    fontWeight: 600,
    padding: 0,
  },
  errorText: {
    color: "var(--color-danger)",
    fontSize: "0.82rem",
    margin: 0,
  },
  redirectBanner: {
    backgroundColor: "var(--color-bg-alt)",
    color: "var(--color-primary)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    padding: "0.65rem 0.8rem",
    fontSize: "0.85rem",
    marginBottom: "1.25rem",
  },
};

export default AuthPage;
