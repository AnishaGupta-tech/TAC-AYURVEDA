const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);