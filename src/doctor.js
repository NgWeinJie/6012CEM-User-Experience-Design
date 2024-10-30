import React, { useState } from 'react';
import './doctor.css';
import { useNavigate } from 'react-router-dom';
import drPediatricianImage from './image/Dr. Pediatrician.png';
import drMistryBrickImage from './image/Dr. Mistry Brick.png';
import drEtherWallImage from './image/Dr. Ether Wall.png';
import drVivianImage from './image/Dr. Vivian.png';

// DoctorCard Component for individual doctor profiles
const DoctorCard = ({ name, specialty, rating, views, image, onProfileClick, onAppointmentClick }) => (
  <div className="doctor-card">
    <div className="doctor-card-image-container">
      <img src={image} alt={name} className="doctor-card-image" />
      <button className="doctor-favorite-button">❤</button>
    </div>
    <div className="doctor-card-details">
      <h3 className="doctor-name">{name}</h3>
      <p className="doctor-specialty">{specialty}</p>
      <div className="doctor-rating">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="doctor-star">{i < rating ? '★' : '☆'}</span>
        ))}
        <span className="doctor-views">{views.toLocaleString()} views</span>
      </div>
      <div className="doctor-actions">
        <button className="doctor-profile-button" onClick={onProfileClick}>Profile</button>
        <button className="doctor-appointment-button" onClick={onAppointmentClick}>
          Make Appointment
        </button>
      </div>
    </div>
  </div>
);

const DoctorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialist, setSpecialist] = useState('Specialist');
  const [branch, setBranch] = useState('Branch');
  const [isSpecialistOpen, setIsSpecialistOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);

  const navigate = useNavigate();

  const doctors = [
    { name: "Dr. Pediatrician", specialty: "Dentist Specialist", branch: "Penang Branch", rating: 3, views: 2821, image: drPediatricianImage },
    { name: "Dr. Mistry Brick", specialty: "Ophthalmology Specialist", branch: "Selangor Branch", rating: 3, views: 2821, image: drMistryBrickImage },
    { name: "Dr. Vivian", specialty: "Cancer Specialist", branch: "Kelantan Branch", rating: 3, views: 2821, image: drEtherWallImage },
    { name: "Dr. Ether Wall", specialty: "Cardiologist Specialist", branch: "Penang Branch", rating: 4, views: 2821, image: drVivianImage }
  ];

  // Updated filter logic to include specialist and branch selection
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (specialist === 'Specialist' || doctor.specialty === specialist) && // Filter by selected specialist
    (branch === 'Branch' || doctor.branch === branch) // Filter by selected branch
  );

  // Function to handle "Make Appointment" button click
  const handleAppointmentClick = (doctor) => {
    navigate('/booking', { state: doctor });
  };

  // Function to handle "Profile" button click
  const handleProfileClick = (doctor) => {
    navigate('/profile', { state: doctor });
  };

  return (
    <div className="doctor-page">
      <h1>Doctors</h1>
      <div className="doctor-search-bar">
        <input 
          type="text" 
          placeholder="Search here..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button className="doctor-clear-button" onClick={() => setSearchQuery('')}>✕</button>
      </div>

      <div className="doctor-filters">
        <div className="doctor-custom-dropdown">
          <button className="doctor-dropdown-btn" onClick={() => setIsSpecialistOpen(!isSpecialistOpen)}>
            {specialist}
          </button>
          {isSpecialistOpen && (
            <ul className="doctor-dropdown-content">
              <li onClick={() => { setSpecialist('Dentist Specialist'); setIsSpecialistOpen(false); }}>Dentist Specialist</li>
              <li onClick={() => { setSpecialist('Cardiologist Specialist'); setIsSpecialistOpen(false); }}>Cardiologist Specialist</li>
              <li onClick={() => { setSpecialist('Cancer Specialist'); setIsSpecialistOpen(false); }}>Cancer Specialist</li>
              <li onClick={() => { setSpecialist('Ophthalmology Specialist'); setIsSpecialistOpen(false); }}>Ophthalmology Specialist</li>
            </ul>
          )}
        </div>

        <div className="doctor-custom-dropdown">
          <button className="doctor-dropdown-btn" onClick={() => setIsBranchOpen(!isBranchOpen)}>
            {branch}
          </button>
          {isBranchOpen && (
            <ul className="doctor-dropdown-content">
              <li onClick={() => { setBranch('Penang Branch'); setIsBranchOpen(false); }}>Penang Branch</li>
              <li onClick={() => { setBranch('Selangor Branch'); setIsBranchOpen(false); }}>Selangor Branch</li>
              <li onClick={() => { setBranch('Kelantan Branch'); setIsBranchOpen(false); }}>Kelantan Branch</li>
            </ul>
          )}
        </div>
      </div>

      <div className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard 
              key={doctor.name} 
              {...doctor} 
              onProfileClick={() => handleProfileClick(doctor)} 
              onAppointmentClick={() => handleAppointmentClick(doctor)} 
            />
          ))
        ) : (
          <p>No doctors found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;
