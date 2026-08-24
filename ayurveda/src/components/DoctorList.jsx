import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthGate';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', date: '', time: '' });
  const [filters, setFilters] = useState({ specialization: '', disease: '' });
  const [bookingError, setBookingError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch doctors from Supabase
  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching doctors:', error);
          return;
        }
        setDoctors(data || []);
      });
  }, []);

  // Handle booking appointment
  const handleBookAppointment = (doctor) => {
    if (!user) {
      navigate('/authpage', { state: { redirectReason: 'Sign in to book a consultation.' } });
      return;
    }
    setBookingError('');
    setSelectedDoctor(doctor);
  };

  // Confirm booking
  const handleConfirmBooking = async () => {
    if (!bookingDetails.name || !bookingDetails.date || !bookingDetails.time) {
      alert('Please fill all fields');
      return;
    }
    if (!user) {
      navigate('/authpage', { state: { redirectReason: 'Sign in to book a consultation.' } });
      return;
    }

    setBookingError('');

    try {
      // Persist the appointment against the real account so it shows on Profile
      const { error: appointmentError } = await supabase.from('appointments').insert({
        user_id: user.id,
        doctor_id: selectedDoctor.id,
        doctor_name: selectedDoctor.name,
        specialization: selectedDoctor.specialization,
        appointment_date: bookingDetails.date,
        appointment_slot: bookingDetails.time,
      });

      if (appointmentError) {
        console.error('Error saving appointment:', appointmentError);
        setBookingError(appointmentError.message);
        return;
      }

      // Mark the doctor as booked (shared demo resource)
      const { error: doctorUpdateError } = await supabase
        .from('doctors')
        .update({ booked: true })
        .eq('id', selectedDoctor.id);

      if (doctorUpdateError) {
        console.error('Error updating doctor booking status:', doctorUpdateError);
      }

      // Update local state
      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor.id === selectedDoctor.id ? { ...doctor, booked: true } : doctor
        )
      );

      // Close the popup
      setSelectedDoctor(null);
      setBookingDetails({ name: '', date: '', time: '' });

      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingError('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="doctor-list ayur-motif">
      <h2>🪷 Available Doctors</h2>

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
              <div className="ayur-photo-ring">
                <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
              </div>
              <h3>{doctor.name}</h3>
              <span className="ayur-pill">🌿 {doctor.specialization}</span>
              {doctor.location && <p className="doctor-location">📍 {doctor.location}</p>}
              {doctor.experience_years && (
                <p className="doctor-experience">{doctor.experience_years}+ years experience</p>
              )}
              {doctor.available_date && (
                <p><strong>Availability:</strong> {doctor.available_date} - {(doctor.available_slots || []).join(', ')}</p>
              )}
              {doctor.booked ? (
                <button disabled className="booked-button">Booked</button>
              ) : (
                <button onClick={() => handleBookAppointment(doctor)} className="book-button">
                  Consult Vaidya
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
            {bookingError && <p style={{ color: '#c0392b', fontSize: '0.85rem' }}>{bookingError}</p>}
            <button onClick={handleConfirmBooking}>Confirm Booking</button>
            <button onClick={() => { setSelectedDoctor(null); setBookingError(''); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
