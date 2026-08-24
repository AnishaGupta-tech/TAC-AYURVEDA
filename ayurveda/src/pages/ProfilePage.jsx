import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthGate';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import PageBanner from '../components/PageBanner';

const ProfilePage = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal } = useCart();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (!error) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setOrdersLoading(false);
      return;
    }
    const fetchOrders = async () => {
      const { data: orderRows, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching orders:', error);
        setOrdersLoading(false);
        return;
      }
      const withItems = await Promise.all(
        (orderRows || []).map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);
          return { ...order, items: items || [] };
        })
      );
      setOrders(withItems);
      setOrdersLoading(false);
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setAppointmentsLoading(false);
      return;
    }
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true });
      if (error) {
        console.error('Error fetching appointments:', error);
        setAppointmentsLoading(false);
        return;
      }
      setAppointments(data || []);
      setAppointmentsLoading(false);
    };
    fetchAppointments();
  }, [user]);

  const statusStyles = {
    processing: { backgroundColor: 'var(--color-secondary)', color: 'var(--color-surface)' },
    shipped: { backgroundColor: '#d4a017', color: 'var(--color-surface)' },
    delivered: { backgroundColor: 'var(--color-primary)', color: 'var(--color-surface)' },
    cancelled: { backgroundColor: 'var(--color-danger, #c0392b)', color: 'var(--color-surface)' },
  };

  const appointmentStatusStyles = {
    confirmed: { backgroundColor: 'var(--color-primary)', color: 'var(--color-surface)' },
    completed: { backgroundColor: 'var(--color-secondary)', color: 'var(--color-surface)' },
    cancelled: { backgroundColor: 'var(--color-danger, #c0392b)', color: 'var(--color-surface)' },
  };

  if (!user) {
    return (
      <div>
        <PageBanner
          title="Your Profile"
          subtitle="Sign in to view your account details."
          image="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200&auto=format&fit=crop"
        />
        <div style={styles.emptyState}>
          <p>You need to sign in to view your profile.</p>
          <Link to="/authpage" style={styles.linkButton}>Sign In</Link>
        </div>
      </div>
    );
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || 'Wellness Seeker';

  return (
    <div>
      <PageBanner
        title="Your Profile"
        subtitle="Manage your account and review your recent cart activity."
        image="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200&auto=format&fit=crop"
      />
      <div style={styles.container}>
        <div className="section-heading">
          <h2>Account Details</h2>
          <p>The information Supabase has on file for your account.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading profile...</p>
        ) : (
          <div style={styles.card}>
            <div style={styles.row}>
              <span style={styles.label}>Name</span>
              <span style={styles.value}>{displayName}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Email</span>
              <span style={styles.value}>{user.email}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Role</span>
              <span style={styles.value}>{profile?.role || 'customer'}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Member since</span>
              <span style={styles.value}>
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        <div className="section-heading" style={{ marginTop: '3rem' }}>
          <h2>Your Saved Cart</h2>
          <p>Synced to your account — a snapshot of what's currently in your shopping cart.</p>
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Your cart is empty right now.</p>
            <Link to="/products" style={styles.linkButton}>Browse the Shop</Link>
          </div>
        ) : (
          <div style={styles.card}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.row}>
                <span style={styles.label}>{item.name} × {item.quantity}</span>
                <span style={styles.value}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ ...styles.row, borderTop: '2px solid var(--color-border)', paddingTop: '10px', marginTop: '10px' }}>
              <span style={{ ...styles.label, fontWeight: 700 }}>Total</span>
              <span style={{ ...styles.value, fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/cart" style={{ ...styles.linkButton, marginTop: '1rem', display: 'inline-block' }}>
              View Cart
            </Link>
          </div>
        )}

        <div className="section-heading" style={{ marginTop: '3rem' }}>
          <h2>Upcoming Appointments</h2>
          <p>Your doctor consultations booked through Vaidya scheduling.</p>
        </div>

        {appointmentsLoading ? (
          <p style={{ textAlign: 'center' }}>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div style={styles.emptyState}>
            <p>You don't have any appointments booked yet.</p>
            <Link to="/doctor-consultation" style={styles.linkButton}>Find a Doctor</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appointments.map((appt) => (
              <div key={appt.id} style={styles.card}>
                <div style={styles.row}>
                  <span style={{ ...styles.label, fontWeight: 700 }}>{appt.doctor_name}</span>
                  <span
                    style={{
                      ...appointmentStatusStyles[appt.status],
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {appt.status}
                  </span>
                </div>
                {appt.specialization && (
                  <div style={styles.row}>
                    <span style={styles.label}>Specialization</span>
                    <span style={styles.value}>{appt.specialization}</span>
                  </div>
                )}
                <div style={{ ...styles.row, borderBottom: 'none' }}>
                  <span style={styles.label}>Date &amp; Slot</span>
                  <span style={styles.value}>
                    {new Date(appt.appointment_date).toLocaleDateString()} · {appt.appointment_slot}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="section-heading" style={{ marginTop: '3rem' }}>
          <h2>Order History</h2>
          <p>Your past orders and their tracking status.</p>
        </div>

        {ordersLoading ? (
          <p style={{ textAlign: 'center' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={styles.emptyState}>
            <p>You haven't placed any orders yet.</p>
            <Link to="/products" style={styles.linkButton}>Browse the Shop</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order) => (
              <div key={order.id} style={styles.card}>
                <div style={styles.row}>
                  <span style={{ ...styles.label, fontWeight: 700 }}>
                    Order #{order.id} · {new Date(order.created_at).toLocaleDateString()}
                  </span>
                  <span
                    style={{
                      ...statusStyles[order.status],
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                {order.items.map((item) => (
                  <div key={item.id} style={styles.row}>
                    <span style={styles.label}>{item.product_name} × {item.quantity}</span>
                    <span style={styles.value}>${(item.price_at_purchase * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ ...styles.row, borderTop: '2px solid var(--color-border)', paddingTop: '10px', marginTop: '10px', borderBottom: 'none' }}>
                  <span style={{ ...styles.label, fontWeight: 700 }}>Total</span>
                  <span style={{ ...styles.value, fontWeight: 700 }}>${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: 'var(--space-xl) var(--space-lg)',
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-md, 12px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
    padding: 'var(--space-lg)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)',
  },
  label: {
    color: 'var(--color-text-muted)',
  },
  value: {
    color: 'var(--color-text)',
    fontWeight: 600,
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--space-xl)',
    color: 'var(--color-text-muted)',
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
};

export default ProfilePage;
