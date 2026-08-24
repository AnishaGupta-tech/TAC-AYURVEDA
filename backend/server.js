require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Initialize Groq (OpenAI-compatible API)
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Generate an upcoming availability date N days from today (keeps demo data "live")
function upcomingDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

// In-memory data storage
// Names + photos sourced from the free, keyless RandomUser.me API (nat=IN), curl-verified 200.
let doctors = [
  {
    id: 1,
    name: 'Dr. Meenakshi Dawangave',
    specialization: 'Panchakarma',
    location: 'Kochi, Kerala',
    experienceYears: 14,
    availability: [{ date: upcomingDate(1), slots: ['10:00 AM', '11:00 AM'] }],
    photo: 'https://randomuser.me/api/portraits/women/39.jpg',
    booked: false, // Track booking status
  },
  {
    id: 2,
    name: 'Dr. Chandresh Padmanabha',
    specialization: 'Nadi Pariksha',
    location: 'Rishikesh, Uttarakhand',
    experienceYears: 19,
    availability: [{ date: upcomingDate(2), slots: ['09:00 AM', '02:00 PM'] }],
    photo: 'https://randomuser.me/api/portraits/men/23.jpg',
    booked: false, // Track booking status
  },
  {
    id: 3,
    name: 'Dr. Savitha Shroff',
    specialization: "Women's Ayurvedic Health",
    location: 'Bengaluru, Karnataka',
    experienceYears: 11,
    availability: [{ date: upcomingDate(3), slots: ['01:00 PM', '03:00 PM'] }],
    photo: 'https://randomuser.me/api/portraits/women/87.jpg',
    booked: false, // Track booking status
  },
  {
    id: 4,
    name: 'Dr. Guneet Shet',
    specialization: 'Kayachikitsa',
    location: 'Pune, Maharashtra',
    experienceYears: 16,
    availability: [{ date: upcomingDate(4), slots: ['04:00 PM', '05:00 PM'] }],
    photo: 'https://randomuser.me/api/portraits/men/35.jpg',
    booked: false, // Track booking status
  },
  {
    id: 5,
    name: 'Dr. Gopika Banerjee',
    specialization: 'Rasayana Therapy',
    location: 'Jaipur, Rajasthan',
    experienceYears: 9,
    availability: [{ date: upcomingDate(5), slots: ['08:00 AM', '12:00 PM'] }],
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    booked: false, // Track booking status
  },
  {
    id: 6,
    name: 'Dr. Aloke Shroff',
    specialization: 'Stress & Sleep Disorders',
    location: 'Chennai, Tamil Nadu',
    experienceYears: 13,
    availability: [{ date: upcomingDate(6), slots: ['10:00 AM', '11:00 AM'] }],
    photo: 'https://randomuser.me/api/portraits/men/17.jpg',
    booked: false, // Track booking status
  },
  {
    id: 7,
    name: 'Dr. Manasa Jain',
    specialization: 'Ayurvedic Dermatology',
    location: 'Delhi NCR',
    experienceYears: 8,
    availability: [{ date: upcomingDate(7), slots: ['11:00 AM', '03:00 PM'] }],
    photo: 'https://randomuser.me/api/portraits/women/29.jpg',
    booked: false, // Track booking status
  },
  {
    id: 8,
    name: 'Dr. Donita Nand',
    specialization: 'Prakriti Analysis',
    location: 'Ahmedabad, Gujarat',
    experienceYears: 20,
    availability: [{ date: upcomingDate(8), slots: ['09:00 AM', '01:00 PM'] }],
    photo: 'https://randomuser.me/api/portraits/women/31.jpg',
    booked: false, // Track booking status
  },
];

let appointments = [];

// Mock health data (fallback if API fails)
let manualHealthData = {
  heartRate: 72,
  sleepQuality: 'Good',
  activityLevel: 'Moderate',
  stressLevel: 'Low',
};

// Mock product data
// Product catalog is defined further below as `mockProducts` and served
// by the /api/products route registered near the bottom of this file.

// Mock guidance data
const guidance = [
  {
    id: 1,
    title: 'Ayurvedic Diet Plan',
    description: 'Learn how to balance your doshas with the right diet.',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=800&auto=format&fit=crop',
    category: 'Diet',
  },
  {
    id: 2,
    title: 'Daily Routine for Balance',
    description: 'Follow this daily routine to stay healthy and balanced.',
    image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=800&auto=format&fit=crop',
    category: 'Lifestyle',
  },
  {
    id: 3,
    title: 'Yoga for Stress Relief',
    description: 'Practice these yoga poses to reduce stress and anxiety.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop',
    category: 'Yoga',
  },
];

// Fetch data from OpenFDA API (mock implementation)
app.get('/api/health-data', async (req, res) => {
  try {
    console.log('Fetching health data from OpenFDA API...');
    const healthData = {
      heartRate: 72,
      sleepQuality: 'Good',
      activityLevel: 'Moderate',
      stressLevel: 'Low',
    };
    res.json(healthData);
  } catch (err) {
    console.error('Error fetching health data from API:', err.message);
    console.log('Using mock health data as fallback...');
    res.json(manualHealthData);
  }
});

// Endpoint for manual health data input
app.post('/api/manual-health-data', (req, res) => {
  const { heartRate, sleepQuality, activityLevel, stressLevel } = req.body;

  if (!heartRate || !sleepQuality || !activityLevel || !stressLevel) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  manualHealthData = {
    heartRate,
    sleepQuality,
    activityLevel,
    stressLevel,
  };

  res.json({ message: 'Health data updated successfully', data: manualHealthData });
});

// Guidance Endpoints
app.get('/api/guidance', (req, res) => {
  res.json(guidance);
});

app.get('/api/guidance/:id', (req, res) => {
  const guidanceId = parseInt(req.params.id);
  const guide = guidance.find((g) => g.id === guidanceId);

  if (guide) {
    res.json(guide);
  } else {
    res.status(404).json({ error: 'Guidance not found' });
  }
});

// Doctor Consultation Endpoints
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.post('/api/appointments', (req, res) => {
  const { doctorId, userId, date, slot } = req.body;

  if (!doctorId || !userId || !date || !slot) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  if (doctor.booked) {
    return res.status(400).json({ error: 'Doctor is already booked' });
  }

  // Mark the doctor as booked
  doctor.booked = true;

  const appointment = {
    id: appointments.length + 1,
    doctorId,
    userId,
    date,
    slot,
  };

  appointments.push(appointment);
  res.json({ message: 'Appointment booked successfully', appointment });
});

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Send the user's message to OpenAI
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: `You are the AyurSphere AI Wellness Assistant, a knowledgeable and friendly guide embedded in the AyurSphere Ayurvedic wellness platform.

SCOPE: Help users with diet and nutrition, daily lifestyle routines (Dinacharya), dosha balance (Vata/Pitta/Kapha), herbal remedies, yoga and pranayama, sleep, stress management, and general Ayurvedic wellness principles. You do NOT diagnose medical conditions, prescribe treatment for serious or urgent symptoms, or replace a licensed physician.

TONE: Warm, encouraging, and practical — speak like a trusted wellness guide, not a clinical textbook. Keep language clear and jargon-light; briefly explain any Sanskrit/Ayurvedic terms you use (e.g. "Agni (digestive fire)").

STRUCTURE: For short questions, answer in 2-4 sentences. For longer or multi-part questions, structure the answer with short headers or bullet points so it's easy to scan.

SAFETY: If a user describes symptoms that sound serious, persistent, or concerning (e.g. severe pain, high fever, chest pain, symptoms lasting weeks), gently recommend they book a consultation with a certified Vaidya through AyurSphere's Doctor Consultation feature, and avoid giving specific medical dosing or diagnosis. Never claim to replace professional medical advice.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Extract the AI's response
    const aiMessage = response.choices[0].message.content;

    // Send the AI's response back to the frontend
    res.json({ message: aiMessage });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to process your message. Please try again.' });
  }
});

// Ayurveda Insights Endpoint
app.get('/api/ayurveda-insights', (req, res) => {
  const insights = [
    {
      id: 1,
      title: 'Benefits of Ashwagandha',
      description: 'Ashwagandha helps reduce stress and improve energy levels.',
    },
    {
      id: 2,
      title: 'Turmeric for Inflammation',
      description: 'Turmeric has powerful anti-inflammatory properties.',
    },
    {
      id: 3,
      title: 'Daily Routine for Balance',
      description: 'Follow a daily routine to maintain balance in your life.',
    },
  ];

  res.json(insights);
});
// Mock product data
const mockProducts = [
  { id: 1, name: "Ashwagandha", category: "herbs", concerns: ["hairfall", "stress"], price: 20, image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=800&auto=format&fit=crop", description: "Boosts immunity and reduces stress.", bestseller: true },
  { id: 2, name: "Turmeric", category: "herbs", concerns: ["acne", "allergy"], price: 15, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop", description: "Anti-inflammatory and antioxidant.", bestseller: false },
  { id: 3, name: "Coconut Oil", category: "oils", concerns: ["hairfall", "dandruff"], price: 10, image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop", description: "Great for skin and hair.", bestseller: true },
  { id: 4, name: "Tulsi Tea", category: "teas", concerns: ["allergy", "stress"], price: 12, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop", description: "Improves digestion and immunity.", bestseller: false },
  { id: 5, name: "Aloe Vera Gel", category: "oils", concerns: ["acne", "hairfall"], price: 18, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=800&auto=format&fit=crop", description: "Soothes skin and promotes hair growth.", bestseller: true },
  { id: 6, name: "Neem Capsules", category: "supplements", concerns: ["acne", "allergy"], price: 25, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop", description: "Purifies blood and improves skin health.", bestseller: true },
];
// API endpoint to fetch products
app.get("/api/products", (req, res) => {
  res.json(mockProducts);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = mockProducts.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// In-memory storage for contact form submissions
let contactMessages = [];

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const submission = {
    id: contactMessages.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  contactMessages.push(submission);
  res.json({ message: 'Thank you! Your message has been received.', submission });
});

// In-memory storage for newsletter signups
let newsletterSubscribers = [];

// Newsletter Signup Endpoint
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  if (newsletterSubscribers.some((sub) => sub.email === email)) {
    return res.status(200).json({ message: 'You are already subscribed!' });
  }

  const subscriber = { id: newsletterSubscribers.length + 1, email, subscribedAt: new Date().toISOString() };
  newsletterSubscribers.push(subscriber);
  res.json({ message: 'Subscribed successfully!', subscriber });
});

// In-memory storage for appointment requests submitted from the "Book An Appointment" form
let appointmentRequests = [];

// Appointment Request Endpoint (general contact-style booking form on the landing page)
app.post('/api/appointment-requests', (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ error: 'Name, email, phone, and service are required' });
  }

  const request = {
    id: appointmentRequests.length + 1,
    name,
    email,
    phone,
    service,
    message: message || '',
    createdAt: new Date().toISOString(),
  };

  appointmentRequests.push(request);
  res.json({ message: 'Thanks! We will send you a confirmation within 24 hours.', request });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});