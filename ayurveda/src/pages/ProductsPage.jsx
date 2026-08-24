import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import { useAuth } from "../components/AuthGate";
import "./ProductPage.css";

// Deterministic pseudo-rating/review-count/discount generated from a product id
// so the values stay stable across renders instead of re-randomizing.
const seededRating = (id) => {
  const seed = String(id).split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rating = (4.2 + (seed % 7) * 0.1).toFixed(1); // 4.2 - 4.8
  const reviews = 20 + (seed % 15) * 17; // varied, stable review count
  const discountPct = 10 + (seed % 5) * 5; // 10 - 30 % off, some products
  const hasDiscount = seed % 3 !== 0; // ~2/3 of products show a badge
  return { rating: Number(rating), reviews, discountPct, hasDiscount };
};

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart, cartCount } = useCart();
  const { user } = useAuth();
  const [activeFilters, setActiveFilters] = useState({ category: "", concern: "", price: "" });
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  // Fetch products from Supabase and subscribe to realtime changes
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }
      setAllProducts(data || []);
    };

    fetchProducts();

    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Add product to the signed-in user's account cart. Requires login.
  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/authpage", { state: { redirectReason: "Sign in to add items to your cart." } });
      return;
    }
    addToCart(product);
  };

  // Buy a product immediately: adds it to the cart and takes the user to checkout
  const handleBuyNow = (product) => {
    if (!user) {
      navigate("/authpage", { state: { redirectReason: "Sign in to buy items." } });
      return;
    }
    addToCart(product);
    navigate("/cart");
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    document.querySelector(".product-list")?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter products based on selected filters and search query
  const getFilteredProducts = allProducts.filter((product) => {
    return (
      (activeFilters.category === "" || product.category.toLowerCase() === activeFilters.category.toLowerCase()) &&
      (activeFilters.concern === "" || product.concerns.includes(activeFilters.concern.toLowerCase())) &&
      (activeFilters.price === "" || product.price <= parseInt(activeFilters.price)) &&
      (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Whether any filter/search is currently narrowing the catalog — if so, show
  // a single flat filtered grid instead of the sectioned browse view.
  const isFiltering =
    activeFilters.category !== "" ||
    activeFilters.concern !== "" ||
    activeFilters.price !== "" ||
    searchTerm !== "";

  const bestsellers = allProducts.filter((p) => p.bestseller);
  const categoriesPresent = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );
  const categoryLabel = (cat) => cat.charAt(0).toUpperCase() + cat.slice(1);

  // Shop by category options with images
  const productCategories = [
    { name: "Herbs", image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=600&auto=format&fit=crop" },
    { name: "Oils", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=600&auto=format&fit=crop" },
    { name: "Teas", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop" },
    { name: "Supplements", image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop" },
  ];

  // Shop by concern options with images
  const healthConcerns = [
    { name: "Hairfall", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=600&auto=format&fit=crop" },
    { name: "Acne", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" },
    { name: "Allergy", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop" },
    { name: "Dandruff", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=600&auto=format&fit=crop" },
  ];

  const renderProductCard = (product) => {
    const { rating, reviews, discountPct, hasDiscount } = seededRating(product.id);
    const originalPrice = hasDiscount
      ? (product.price / (1 - discountPct / 100)).toFixed(2)
      : null;
    const fullStars = Math.round(rating);
    return (
      <div key={product.id} className="product-card">
        {product.bestseller && <span className="bestseller-badge">Bestseller</span>}
        {hasDiscount && <span className="discount-badge">{discountPct}% OFF</span>}
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-rating">
          <span className="stars" aria-hidden="true">
            {"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}
          </span>
          <span className="rating-value">{rating}</span>
          <span className="review-count">({reviews})</span>
        </div>
        <div className="product-price">
          {originalPrice && <span className="original-price">${originalPrice}</span>}
          <span className="current-price">${product.price}</span>
        </div>
        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        <button onClick={() => handleBuyNow(product)}>Buy Now</button>
      </div>
    );
  };

  return (
    <div className="product-page ayur-motif">
      {/* In-page product search */}
      <div className="shop-search">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Banner */}
      <div className="shop-banner">
        <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600&auto=format&fit=crop" alt="Ayurvedic herbs and wellness products" />
      </div>

      <div className="section-heading">
        <h2>Shop All Products</h2>
        <p>Everything in one place — narrow it down by category, health concern, or price below.</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <label className="filter-label">
          <span>Category</span>
          <select name="category" onChange={updateFilters}>
            <option value="">All Categories</option>
            {productCategories.map((category, index) => (
              <option key={index} value={category.name.toLowerCase()}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className="filter-label">
          <span>Health Concern</span>
          <select name="concern" onChange={updateFilters}>
            <option value="">All Concerns</option>
            {healthConcerns.map((concern, index) => (
              <option key={index} value={concern.name.toLowerCase()}>{concern.name}</option>
            ))}
          </select>
        </label>
        <label className="filter-label">
          <span>Price</span>
          <select name="price" onChange={updateFilters}>
            <option value="">All Prices</option>
            <option value="100">Under $100</option>
            <option value="50">Under $50</option>
            <option value="20">Under $20</option>
          </select>
        </label>
        {cartCount > 0 && (
          <span className="filter-cart-note">🛒 {cartCount} item{cartCount === 1 ? "" : "s"} in cart</span>
        )}
      </div>

      {/* Product List: sectioned browse view when unfiltered, single grid when filtering/searching */}
      {isFiltering ? (
        <div className="product-list">
          {getFilteredProducts.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>No products match your filters.</p>
          ) : (
            getFilteredProducts.map(renderProductCard)
          )}
        </div>
      ) : (
        <>
          {bestsellers.length > 0 && (
            <div className="product-section">
              <div className="section-heading">
                <h2>Bestsellers</h2>
                <p>Customer favorites, tried and loved.</p>
              </div>
              <div className="product-list">{bestsellers.map(renderProductCard)}</div>
            </div>
          )}

          {categoriesPresent.map((cat) => {
            const inCategory = allProducts.filter((p) => p.category === cat);
            if (inCategory.length === 0) return null;
            return (
              <div className="product-section" key={cat}>
                <div className="section-heading">
                  <h2>{categoryLabel(cat)}</h2>
                  <p>Explore our {categoryLabel(cat).toLowerCase()} collection.</p>
                </div>
                <div className="product-list">{inCategory.map(renderProductCard)}</div>
              </div>
            );
          })}
        </>
      )}

      {/* Reviews teaser */}
      <div className="testimonials">
        <div className="section-heading">
          <h2>Loved by Our Customers</h2>
          <p>See what real customers say about our products and consultations.</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/reviews" className="view-all-reviews-link">Read All Reviews →</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
