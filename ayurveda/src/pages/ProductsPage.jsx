import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ category: "", concern: "", price: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from backend
  useEffect(() => {
    axios.get("/api/products")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Add product to cart
  const handleAddToCart = (product) => {
    setUserCart([...userCart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Handle filter changes
  const updateFilters = (e) => {
    const { name, value } = e.target;
    setActiveFilters({ ...activeFilters, [name]: value });
  };

  // Handle search
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on selected filters and search query
  const getFilteredProducts = allProducts.filter((product) => {
    return (
      (activeFilters.category === "" || product.category === activeFilters.category) &&
      (activeFilters.concern === "" || product.concerns.includes(activeFilters.concern)) &&
      (activeFilters.price === "" || product.price <= parseInt(activeFilters.price)) &&
      (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Shop by category options with images
  const productCategories = [
    { name: "Herbs", image: "https://via.placeholder.com/100" },
    { name: "Oils", image: "https://via.placeholder.com/100" },
    { name: "Teas", image: "https://via.placeholder.com/100" },
    { name: "Supplements", image: "https://via.placeholder.com/100" },
  ];

  // Shop by concern options with images
  const healthConcerns = [
    { name: "Hairfall", image: "https://via.placeholder.com/100" },
    { name: "Acne", image: "https://via.placeholder.com/100" },
    { name: "Allergy", image: "https://via.placeholder.com/100" },
    { name: "Dandruff", image: "https://via.placeholder.com/100" },
  ];

  // Bestsellers
  const topBestsellers = allProducts.filter((product) => product.bestseller);

  // Testimonials
  const customerTestimonials = [
    { id: 1, name: "John Doe", comment: "Great products! Helped me with my acne." },
    { id: 2, name: "Jane Smith", comment: "The oils are amazing for my hair." },
  ];

  return (
    <div className="product-page">
      {/* Navbar with Search */}
      <div className="navbar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <button>Search</button>
        </div>
      </div>

      {/* Banner */}
      <div className="banner">
        <img src="https://via.placeholder.com/1200x300" alt="Banner" />
      </div>

      {/* Filters */}
      <div className="filters">
        <select name="category" onChange={updateFilters}>
          <option value="">All Categories</option>
          {productCategories.map((category, index) => (
            <option key={index} value={category.name.toLowerCase()}>{category.name}</option>
          ))}
        </select>
        <select name="concern" onChange={updateFilters}>
          <option value="">All Concerns</option>
          {healthConcerns.map((concern, index) => (
            <option key={index} value={concern.name.toLowerCase()}>{concern.name}</option>
          ))}
        </select>
        <select name="price" onChange={updateFilters}>
          <option value="">All Prices</option>
          <option value="100">Under $100</option>
          <option value="50">Under $50</option>
          <option value="20">Under $20</option>
        </select>
      </div>

      {/* Product List */}
      <div className="product-list">
        {getFilteredProducts.slice(0, 6).map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button>Buy Now</button>
          </div>
        ))}
      </div>

      {/* Shop by Category */}
      <div className="shop-by-category">
        <h2>Shop by Category</h2>
        <div className="category-list">
          {productCategories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} className="category-image" />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Shop by Concern */}
      <div className="shop-by-concern">
        <h2>Shop by Concern</h2>
        <div className="concern-list">
          {healthConcerns.map((concern, index) => (
            <div key={index} className="concern-card">
              <img src={concern.image} alt={concern.name} className="concern-image" />
              <h3>{concern.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <div className="bestsellers">
        <h2>Bestsellers</h2>
        <div className="bestseller-list">
          {topBestsellers.map((product) => (
            <div key={product.id} className="bestseller-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-list">
          {customerTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;