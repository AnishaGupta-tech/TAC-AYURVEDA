import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../components/AuthGate";

const initialForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  concerns: "",
  bestseller: false,
};

const AdminAddProduct = () => {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      image: formData.image,
      category: formData.category,
      concerns: formData.concerns
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean),
      bestseller: formData.bestseller,
    };

    const { error: insertError } = await supabase.from("products").insert(payload);

    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage("Product added successfully.");
      setFormData(initialForm);
    }
    setSubmitting(false);
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p>You must be signed in to add products.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Add Product</h1>
        <p style={styles.hint}>
          Only accounts with an admin role can successfully add a product; this is enforced
          by database row-level security. Anyone signed in can see this form.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            style={styles.input}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="category"
            placeholder="Category (e.g. herbs, oils, teas, supplements)"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="concerns"
            placeholder="Concerns, comma-separated (e.g. hairfall, acne)"
            value={formData.concerns}
            onChange={handleChange}
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
            />
            Bestseller
          </label>
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? "Adding..." : "Add Product"}
          </button>
          {message && <p style={styles.successText}>{message}</p>}
          {error && <p style={styles.errorText}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    minHeight: "70vh",
  },
  card: {
    backgroundColor: "var(--color-surface)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "480px",
  },
  header: {
    color: "var(--color-primary)",
    fontSize: "1.8rem",
    marginBottom: "10px",
  },
  hint: {
    color: "var(--color-text-muted)",
    fontSize: "0.85rem",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid var(--color-border)",
    fontSize: "1rem",
    outline: "none",
    fontFamily: "inherit",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "var(--color-primary)",
    color: "var(--color-surface)",
    fontSize: "1rem",
    cursor: "pointer",
  },
  successText: {
    color: "green",
    fontSize: "0.9rem",
  },
  errorText: {
    color: "var(--color-danger)",
    fontSize: "0.9rem",
  },
};

export default AdminAddProduct;
