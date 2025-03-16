const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book an appointment
router.post('/appointments', async (req, res) => {
  const { doctorId, userId, date, slot } = req.body;

  if (!doctorId || !userId || !date || !slot) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const appointment = new Appointment({ doctorId, userId, date, slot });
    await appointment.save();
    res.json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;