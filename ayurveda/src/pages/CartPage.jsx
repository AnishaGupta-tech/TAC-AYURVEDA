import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../components/AuthGate';
import { supabase } from '../lib/supabaseClient';
import PageBanner from '../components/PageBanner';

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;
    setCheckingOut(true);
    setCheckoutError('');
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({ user_id: user.id, total: cartTotal, status: 'processing' })
        .select()
        .single();
      if (orderError) throw orderError;

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      await clearCart();
      setPlacedOrderId(order.id);
      setOrderPlaced(true);
    } catch (err) {
      console.error('Checkout failed:', err);
      setCheckoutError(err.message || 'Something went wrong placing your order. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (!user) {
    return (
      <div>
        <PageBanner
          title="Your Cart"
          subtitle="Sign in to view your saved cart."
          image="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
        />
        <div style={styles.emptyState}>
          <p>Sign in to view your cart.</p>
          <Link to="/authpage" style={styles.linkButton}>Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner
        title="Your Cart"
        subtitle="Review your items before checking out."
        image="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
      />
      <div style={styles.container}>
        {orderPlaced ? (
          <div style={styles.confirmation}>
            <div style={{ fontSize: '3rem' }}>🌿</div>
            <h2>Order Placed!</h2>
            <p>
              Order #{placedOrderId} has been recorded to your account and is now "processing".
              This is a demo app — no real payment was charged, but this order and its tracking
              status are real and saved to your profile.
            </p>
            <Link to="/products" style={styles.linkButton}>Continue Shopping</Link>
            <br />
            <Link to="/profile" style={{ ...styles.linkButton, marginTop: '0.75rem' }}>View Order History</Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Your cart is empty.</p>
            <Link to="/products" style={styles.linkButton}>Browse the Shop</Link>
          </div>
        ) : (
          <>
            <div className="section-heading">
              <h2>Items in Your Cart</h2>
              <p>{cartItems.length} distinct item{cartItems.length === 1 ? '' : 's'}</p>
            </div>
            <div style={styles.list}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.item}>
                  <img src={item.image} alt={item.name} style={styles.image} />
                  <div style={styles.itemInfo}>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <p style={{ color: 'var(--color-text-muted)', margin: '4px 0' }}>
                      ${item.price} each
                    </p>
                    <div style={styles.qtyRow}>
                      <button
                        type="button"
                        style={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        style={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={styles.itemRight}>
                    <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      type="button"
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span>Total</span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button type="button" style={styles.checkoutBtn} onClick={handleCheckout} disabled={checkingOut}>
                {checkingOut ? 'Placing order...' : 'Checkout (Demo — no payment charged)'}
              </button>
              {checkoutError && <p style={{ ...styles.demoNote, color: 'var(--color-danger, #c0392b)' }}>{checkoutError}</p>}
              <p style={styles.demoNote}>
                AyurSphere is a demo app: no real payment is collected. Checking out creates a real
                order record on your account so you can track its status from your profile.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: 'var(--space-xl) var(--space-lg)',
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--space-xl)',
    color: 'var(--color-text-muted)',
  },
  confirmation: {
    textAlign: 'center',
    padding: 'var(--space-xl)',
    color: 'var(--color-text)',
  },
  linkButton: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '10px 22px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-surface)',
    textDecoration: 'none',
    fontWeight: 600,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
    padding: '1rem',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  itemInfo: {
    flex: 1,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-alt)',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  itemRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
  },
  removeBtn: {
    border: 'none',
    background: 'none',
    color: 'var(--color-danger, #c0392b)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    textDecoration: 'underline',
    padding: 0,
  },
  summary: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: 'var(--color-bg-alt)',
    borderRadius: '10px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  checkoutBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-surface)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  demoNote: {
    marginTop: '0.75rem',
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    textAlign: 'center',
  },
};

export default CartPage;
