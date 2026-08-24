import React from 'react';
import PageBanner from '../components/PageBanner';

const Stars = ({ rating }) => (
  <span aria-hidden="true" style={{ color: 'var(--color-secondary-dark)', letterSpacing: '2px' }}>
    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  </span>
);

const reviews = [
  {
    id: 1,
    name: 'Priya Nair',
    role: 'Skincare, Neem Capsules',
    rating: 5,
    comment:
      "My skin cleared up within a month of adding Neem Capsules and switching to a Pitta-friendly diet. The AI assistant's suggestions were surprisingly on point.",
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    role: 'Doctor Consultation, Dr. Chandresh Padmanabha',
    rating: 5,
    comment:
      "Booking a Vaidya consultation was so easy, and Dr. Padmanabha's Nadi Pariksha reading was incredibly detailed. I finally understand my Vata imbalance.",
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    role: 'Ashwagandha Capsules',
    rating: 4,
    comment:
      'Noticeably calmer within two weeks of taking Ashwagandha daily. Shipping was quick and the product quality feels premium.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: 4,
    name: 'Vikram Choudhary',
    role: 'Prakriti Analysis tool',
    rating: 5,
    comment:
      "The Prakriti quiz nailed my Pitta-Kapha combination in under two minutes. It's now the first thing I recommend to friends curious about Ayurveda.",
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    id: 5,
    name: 'Meera Krishnan',
    role: 'Guidance articles',
    rating: 5,
    comment:
      'The daily Dinacharya guide changed my mornings completely. Simple, practical tips that actually fit into a busy schedule.',
    image: 'https://randomuser.me/api/portraits/women/53.jpg',
  },
  {
    id: 6,
    name: 'Arjun Malhotra',
    role: 'Turmeric & Coconut Oil bundle',
    rating: 4,
    comment:
      'Great quality herbs at fair prices. Would love to see more bundle discounts, but the products themselves are excellent.',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: 7,
    name: 'Sneha Reddy',
    role: 'Doctor Consultation, Dr. Manasa Jain',
    rating: 5,
    comment:
      'Dr. Jain gave me a clear, practical skincare routine for my acne-prone Pitta skin. Already seeing results after three weeks.',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 8,
    name: 'Karan Bhatia',
    role: 'AI Wellness Assistant',
    rating: 4,
    comment:
      'Genuinely useful for quick questions about herbs and dosha balance late at night when no one else is around to ask.',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
];

const ReviewsPage = () => {
  return (
    <div>
      <PageBanner
        title="What Our Community Says"
        subtitle="Real experiences from people on their Ayurvedic wellness journey."
        image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop"
      />
      <div style={styles.container}>
        <div className="section-heading">
          <h2>Reviews from Real Customers</h2>
          <p>Feedback on our products, doctor consultations, and diagnostic tools.</p>
        </div>
        <div style={styles.grid}>
          {reviews.map((r) => (
            <div key={r.id} style={styles.card}>
              <div style={styles.header}>
                <img src={r.image} alt={r.name} style={styles.avatar} />
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text)' }}>{r.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{r.role}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.75rem', lineHeight: 1.5 }}>
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--space-xl) var(--space-lg)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--space-lg)',
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
    padding: '1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export default ReviewsPage;
