const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: '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',
});

// In-memory data storage
let doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialization: 'General Ayurveda',
    availability: [{ date: '2023-10-15', slots: ['10:00 AM', '11:00 AM'] }],
    photo: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    booked: false, // Track booking status
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialization: 'Panchakarma',
    availability: [{ date: '2023-10-16', slots: ['09:00 AM', '02:00 PM'] }],
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    booked: false, // Track booking status
  },
  {
    id: 3,
    name: 'Dr. Alice Johnson',
    specialization: 'Yoga Therapy',
    availability: [{ date: '2023-10-17', slots: ['01:00 PM', '03:00 PM'] }],
    photo: 'https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    booked: false, // Track booking status
  },
  {
    id: 4,
    name: 'Dr. Robert Brown',
    specialization: 'Herbal Medicine',
    availability: [{ date: '2023-10-18', slots: ['04:00 PM', '05:00 PM'] }],
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    booked: false, // Track booking status
  },
  {
    id: 5,
    name: 'Dr. Emily Davis',
    specialization: 'Diet and Nutrition',
    availability: [{ date: '2023-10-19', slots: ['08:00 AM', '12:00 PM'] }],
    photo: 'https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
    booked: false, // Track booking status
  },
  {
    id: 6,
    name: 'Dr. Michael Wilson',
    specialization: 'Stress Management',
    availability: [{ date: '2023-10-20', slots: ['10:00 AM', '11:00 AM'] }],
    photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image
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
const products = [
  {
    id: 1,
    name: 'Ashwagandha Capsules',
    description: 'Helps reduce stress and improve energy levels.',
    price: 20.99,
    image: 'https://via.placeholder.com/150',
    category: 'Supplements',
  },
  {
    id: 2,
    name: 'Turmeric Powder',
    description: 'Anti-inflammatory and antioxidant properties.',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    category: 'Spices',
  },
  {
    id: 3,
    name: 'Sesame Oil',
    description: 'Used for Ayurvedic massages and skincare.',
    price: 15.99,
    image: 'https://via.placeholder.com/150',
    category: 'Oils',
  },
];

// Mock guidance data
const guidance = [
  {
    id: 1,
    title: 'Ayurvedic Diet Plan',
    description: 'Learn how to balance your doshas with the right diet.',
    image: 'https://via.placeholder.com/150',
    category: 'Diet',
  },
  {
    id: 2,
    title: 'Daily Routine for Balance',
    description: 'Follow this daily routine to stay healthy and balanced.',
    image: 'https://via.placeholder.com/150',
    category: 'Lifestyle',
  },
  {
    id: 3,
    title: 'Yoga for Stress Relief',
    description: 'Practice these yoga poses to reduce stress and anxiety.',
    image: 'https://via.placeholder.com/150',
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

// Products Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
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
      model: 'gpt-3.5-turbo', // Use GPT-3.5 Turbo
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant that provides Ayurveda-related advice.',
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
  { id: 1, name: "Ashwagandha", category: "herbs", concerns: ["hairfall", "stress"], price: 20, image: "https://via.placeholder.com/150", description: "Boosts immunity and reduces stress.", bestseller: true },
  { id: 2, name: "Turmeric", category: "herbs", concerns: ["acne", "allergy"], price: 15, image: "https://via.placeholder.com/150", description: "Anti-inflammatory and antioxidant.", bestseller: false },
  { id: 3, name: "Coconut Oil", category: "oils", concerns: ["hairfall", "dandruff"], price: 10, image: "https://via.placeholder.com/150", description: "Great for skin and hair.", bestseller: true },
  { id: 4, name: "Tulsi Tea", category: "teas", concerns: ["allergy", "stress"], price: 12, image: "https://via.placeholder.com/150", description: "Improves digestion and immunity.", bestseller: false },
  { id: 5, name: "Aloe Vera Gel", category: "oils", concerns: ["acne", "hairfall"], price: 18, image: "https://via.placeholder.com/150", description: "Soothes skin and promotes hair growth.", bestseller: true },
  { id: 6, name: "Neem Capsules", category: "supplements", concerns: ["acne", "allergy"], price: 25, image: "https://via.placeholder.com/150", description: "Purifies blood and improves skin health.", bestseller: true },
];
// API endpoint to fetch products
app.get("/api/products", (req, res) => {
  res.json(mockProducts);
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});