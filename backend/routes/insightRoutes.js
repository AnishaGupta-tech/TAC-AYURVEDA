const express = require('express');
const router = express.Router();

// Ayurveda Insights Endpoint
router.get('/', (req, res) => {
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

module.exports = router;