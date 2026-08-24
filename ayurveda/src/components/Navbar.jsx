import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthGate';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="site-header">
      <div className="promo-strip">
        🌿 Free shipping on orders above ₹999 &nbsp;|&nbsp; Consult a certified Vaidya today
      </div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">🌿 AyurSphere</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/guidance">Guidance</Link>
          <Link to="/doctor-consultation">Consult Vaidya</Link>
          <Link to="/advanced-diagnostics/ai-assistant">AI Assistant</Link>
          <Link to="/advanced-diagnostics/prakriti-analysis">Prakriti Analysis</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/products">Shop</Link>
        </div>
        <div className="nav-auth">
          <Link to="/cart" className="nav-cart" aria-label="View cart">
            🛒
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="nav-user-menu" ref={menuRef}>
              <button
                type="button"
                className="nav-user-trigger"
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                {user.user_metadata?.full_name || user.email} ▾
              </button>
              {menuOpen && (
                <div className="nav-user-dropdown">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
                  <Link to="/cart" onClick={() => setMenuOpen(false)}>My Cart</Link>
                  <Link to="/admin/add-product" onClick={() => setMenuOpen(false)}>Add Product</Link>
                  <button type="button" onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/authpage" className="nav-signin">Sign In</Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
