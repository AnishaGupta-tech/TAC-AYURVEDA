const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/productsRoutes');
const guidanceRoutes = require('./routes/guidanceRoutes');
const doctorRoutes = require('./routes/doctorRoutes'); // New doctor routes
const chatRoutes = require('./routes/chatRoutes'); // New chat routes
const insightRoutes = require('./routes/insightRoutes'); // New insight routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/guidance', guidanceRoutes);
app.use('/api/doctors', doctorRoutes); // Add doctor routes
app.use('/api/chat', chatRoutes); // Add chat routes
app.use('/api/insights', insightRoutes); // Add insight routes

module.exports = app;