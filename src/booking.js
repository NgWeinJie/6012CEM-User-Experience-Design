import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './booking.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state;

  const mockData = {
    name: "Abdullah Hamun",
    age: {
      day: "12",
      month: "July",
      year: "1995"
    },
    gender: "male",
    mobile: "+601700000000",
    email: "itsmehamun@gmail.com"
  };

  const [formData, setFormData] = useState({
    nric: "",
    name: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    mobile: "",
    email: ""
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const timeSlots = {
    morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Show the modal with confirmation message
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/'); // Redirect to the home page
  };

  const handleSearchClick = () => {
    // Auto-fill using mockData regardless of the input
    setFormData({
      nric: formData.nric,
      name: mockData.name,
      day: mockData.age.day,
      month: mockData.age.month,
      year: mockData.age.year,
      gender: mockData.gender,
      mobile: mockData.mobile,
      email: mockData.email
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="booking-container">
      <div className="booking-doctor-info">
        <img src={doctor.image} alt={doctor.name} className="booking-doctor-image" />
        <div className="booking-doctor-details">
          <h2>{doctor.name}</h2>
          <p>{doctor.specialty}</p>
          <div className="booking-rating">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="booking-star">{i < doctor.rating ? '★' : '☆'}</span>
            ))}
            <span className="booking-views">({doctor.views} views)</span>
          </div>
        </div>
      </div>

      <main className="booking-main">
        <div className="booking-steps">
          <div className="booking-step-container">
            <div className="booking-step">
              <h3>Step 1: Select Your Date</h3>
              <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
            <div className="booking-step">
              <h3>Step 2: Select Your Time</h3>
              <div className="booking-time-slots">
                <h4>Morning slots</h4>
                <div className="booking-slots">
                  {timeSlots.morning.map((time) => (
                    <button
                      key={time}
                      className={`booking-slot-button morning-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <h4>Afternoon slots</h4>
                <div className="booking-slots">
                  {timeSlots.afternoon.map((time) => (
                    <button
                      key={time}
                      className={`booking-slot-button afternoon-slot ${selectedTime === time ? 'selected' : ''} ${time === '4:30 PM' ? 'disabled' : ''}`}
                      onClick={() => time !== '4:30 PM' && handleTimeSelect(time)}
                      disabled={time === '4:30 PM'} // Disable the button functionality
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="booking-patient-details">
            <h3>Step 3 Patient's Details</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="booking-input-group">
                <label>NRIC/Passport No</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="nric"
                    value={formData.nric}
                    onChange={handleInputChange}
                    placeholder="Enter NRIC/Passport No"
                    required
                  />
                  <i className="fas fa-search search-icon" onClick={handleSearchClick}></i>
                </div>
                <small>Returning Patient record retrieval</small>
              </div>
              <div className="booking-input-group">
                <label>Patient's Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Patient's Name"
                  required
                />
              </div>
              <div className="booking-age-select">
                <label>Age</label>
                <div className="age-select-container">
                  <select name="day" value={formData.day} onChange={handleInputChange}>
                    <option value="" disabled>Day</option>
                    {[...Array(31).keys()].map(day => (
                      <option key={day + 1} value={day + 1}>{day + 1}</option>
                    ))}
                  </select>
                  <select name="month" value={formData.month} onChange={handleInputChange}>
                    <option value="" disabled>Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                  <select name="year" value={formData.year} onChange={handleInputChange}>
                    <option value="" disabled>Year</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="booking-gender-select">
                <label>Gender</label>
                <div className="gender-options">
                  <label><input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleInputChange} /> Male</label>
                  <label><input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleInputChange} /> Female</label>
                  <label><input type="radio" name="gender" value="others" checked={formData.gender === "others"} onChange={handleInputChange} /> Others</label>
                </div>
              </div>
              <div className="booking-input-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>
              <div className="booking-input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <button type="submit" className="booking-appointment-button">Make Appointment</button>
            </form>
          </div>
        </div>
      </main>


        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <i className="fas fa-thumbs-up like-icon"></i> {/* Like Icon */}
              <h1>Thank You!</h1>
              <p>Your Appointment Successful</p>
              <p>You booked an appointment with Dr. Pediatrician Purpieson on February 29, at 02:00 PM.</p>
              <button className="modal-close-button" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Booking;
