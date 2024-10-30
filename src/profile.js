import React, { useState } from 'react';
import './profile.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState('AboutMe'); // State to handle tab switching
  const [filterRating, setFilterRating] = useState('all'); // State to handle review rating filtering

  const doctor = state;

  if (!doctor) {
    return <p>No doctor information available.</p>;
  }

  // Static information for the doctor
  const staticDoctorInfo = {
    experience: 10,
    patients: 1000,
    bio: "Dr. Vivian is the top immunologist at Christ Hospital in London. She has achieved several awards for her contribution to the medical field and is available for private consultations.",
    workingTime: "Monday – Friday, 08:00 AM – 20:00 PM",
    reviews: 4279,
    rating: 4.8
  };

  // Example reviews data
  const reviews = [
    {
      name: 'Erika Thee',
      review: 'Just a wonderful doctor, very happy that she is leading our child, competent, very smart, nice.',
      rating: 5,
    },
    {
      name: 'Armen Sargsyan',
      review: 'Just a wonderful doctor, very happy that she is leading our child, competent, very smart, nice.',
      rating: 5,
    },
    {
      name: 'John Doe',
      review: 'Dr. Vivian is very professional and knowledgeable. She made me feel at ease throughout the entire consultation.',
      rating: 3,
    },
    {
      name: 'Jane Smith',
      review: 'Great doctor! I was impressed by her attention to detail and how she explained everything clearly.',
      rating: 4,
    },
  ];

  // Function to filter reviews based on the selected rating
  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true; // If "all" is selected, show all reviews
    return review.rating === parseInt(filterRating); // Filter reviews based on the selected rating
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab when clicked
  };

  const handleRatingFilterChange = (e) => {
    setFilterRating(e.target.value); // Update the filter when the user selects a rating
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={doctor.image} alt={doctor.name} className="profile-image" />
        <div className="profile-header-info">
          <h2 className="profile-name">{doctor.name}</h2>
          <p className="profile-specialty">{doctor.specialty}</p>
          <div className="profile-rating">
            <span className="rating-star">★ {staticDoctorInfo.rating.toFixed(1)}</span>
            <span className="rating-reviews">({staticDoctorInfo.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`tab-button ${activeTab === 'AboutMe' ? 'active' : ''}`} onClick={() => handleTabClick('AboutMe')}>About Me</button>
        <button className={`tab-button ${activeTab === 'Location' ? 'active' : ''}`} onClick={() => handleTabClick('Location')}>Location</button>
        <button className={`tab-button ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</button>
      </div>

      {activeTab === 'AboutMe' && (
        <div>
          <div className="profile-info">
            <div className="info-box">
              <span className="info-value">{staticDoctorInfo.experience} Yrs</span>
              <span className="info-label">Experience</span>
            </div>
            <div className="info-box">
              <span className="info-value">{staticDoctorInfo.rating}</span>
              <span className="info-label">Ratings</span>
            </div>
            <div className="info-box">
              <span className="info-value">{staticDoctorInfo.patients}+</span>
              <span className="info-label">Patients</span>
            </div>
          </div>

          <div className="about-me-section">
            <h3>About {doctor.name}</h3>
            <p>{staticDoctorInfo.bio}</p>
            <p><strong>Working Time:</strong> {staticDoctorInfo.workingTime}</p>
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="reviews-section">
          <div className="reviews-filter">
            <label htmlFor="filter-reviews">Filter by rating:</label>
            <select id="filter-reviews" value={filterRating} onChange={handleRatingFilterChange}>
              <option value="all">All</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="reviews-row">
            {filteredReviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-author">
                  <span className="review-avatar">{review.name.charAt(0)}</span>
                  <div className="review-author-details">
                    <h4>{review.name}</h4>
                    <div className="review-rating">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i} className="review-star">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="appointment-button">Make An Appointment</button>
    </div>
  );
};

export default DoctorProfile;
