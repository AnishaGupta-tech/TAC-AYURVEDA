const express = require('express');
const router = express.Router();

// AI Chat Endpoint
router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Mock AI response (replace with actual AI integration)
  const response = `You said: "${message}". Here's some Ayurveda advice: Drink warm water and practice yoga daily.`;

  res.json({ message: response });
});

module.exports = router;