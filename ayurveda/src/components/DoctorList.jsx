import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', date: '', time: '' });
  const [filters, setFilters] = useState({ specialization: '', disease: '' });

  // Get base URL from environment variable
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Fetch doctors from the backend
  useEffect(() => {
    axios.get(`${baseURL}/api/doctors`)
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle booking appointment
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Confirm booking
  const handleConfirmBooking = async () => {
    if (!bookingDetails.name || !bookingDetails.date || !bookingDetails.time) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Send booking request to the backend
      const response = await axios.post(`${baseURL}/api/appointments`, {
        doctorId: selectedDoctor.id,
        userId: 'user123', // Replace with actual user ID
        date: bookingDetails.date,
        slot: bookingDetails.time,
      });

      // Update the doctor's status to "booked"
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === selectedDoctor.id ? { ...doctor, booked: true } : doctor
      );
      setDoctors(updatedDoctors);

      // Close the popup
      setSelectedDoctor(null);
      setBookingDetails({ name: '', date: '', time: '' });

      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="doctor-list">
      <h2>Available Doctors</h2>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by specialization"
          value={filters.specialization}
          onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by disease"
          value={filters.disease}
          onChange={(e) => setFilters({ ...filters, disease: e.target.value })}
        />
      </div>

      {/* Doctor Cards */}
      <div className="cards">
        {doctors
          .filter((doctor) => {
            const matchesSpecialization = filters.specialization
              ? doctor.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
              : true;
            const matchesDisease = filters.disease
              ? doctor.specialization.toLowerCase().includes(filters.disease.toLowerCase())
              : true;
            return matchesSpecialization && matchesDisease;
          })
          .map((doctor) => (
            <div key={doctor.id} className="card">
              <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
              <h3>{doctor.name}</h3>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Availability:</strong> {doctor.availability[0].date} - {doctor.availability[0].slots.join(', ')}</p>
              {doctor.booked ? (
                <button disabled className="booked-button">Booked</button>
              ) : (
                <button onClick={() => handleBookAppointment(doctor)} className="book-button">
                  Book Appointment
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Booking Popup */}
      {selectedDoctor && (
        <div className="popup">
          <div className="popup-content">
            <h3>Book Appointment with {selectedDoctor.name}</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={bookingDetails.name}
              onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
            />
            <input
              type="date"
              value={bookingDetails.date}
              onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
            />
            <input
              type="time"
              value={bookingDetails.time}
              onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
            />
            <button onClick={handleConfirmBooking}>Confirm Booking</button>
            <button onClick={() => setSelectedDoctor(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
