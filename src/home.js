import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Router components
import './home.css';
import penangImage from './image/penang.png';
import DoctorPage from './doctor'; 
import Booking from './booking';
import DoctorProfile from './profile';
import MessagePage from './message';
import UserProfile from './user_profile';
import ContactUs from './contact';
import Appointment from './appointment';

// Import the new images
import doctorAppointmentImg from './image/Doctors Appointment.png';
import contactUsImg from './image/Contact Us.png';
import emergencyImg from './image/Emergency.png';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainContent />} /> {/* Main content */}
          <Route path="/doctor" element={<DoctorPage />} /> {/* Route to DoctorPage */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<DoctorProfile />} />
          <Route path="/uprofile" element={<UserProfile />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </main>
    </div>
  );
};

// MainContent component for Home page
const MainContent = () => (
  <>
    <WelcomeSection />
    <Categories />
    <MedicalCenterList />
  </>
);

const Header = () => (
  <header className="app-header">
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/appointment">My Appointment</Link>
      <Link to="/message">Message</Link>
      <Link to="/uprofile">Profile</Link>
      <Link to="/">Notification</Link>
    </nav>
  </header>
);

const WelcomeSection = () => (
  <section className="welcome-section">
    <div className="welcome-content">
      <h1>Hi, Steven</h1>
      <h2>Let’s find your top doctor!</h2>
    </div>
  </section>
);

const Categories = () => (
  <section className="categories">
    <h3>Categories</h3>
    <div className="category-buttons">
      <CategoryCard title="Doctors Appointment" icon={doctorAppointmentImg} className="doctors" linkTo="/doctor" />
      <CategoryCard title="Contact Us" icon={contactUsImg} className="contact" linkTo="/contact" />
      <CategoryCard title="Emergency" icon={emergencyImg} className="emergency" />
    </div>
  </section>
);

const CategoryCard = ({ title, icon, className, linkTo }) => (
  <Link to={linkTo} className={`category-card ${className}`}>
    <div className="category-content">
      <img src={icon} alt={title} className="category-icon-image" />
      <p>{title}</p>
    </div>
  </Link>
);

const MedicalCenterList = () => (
  <section className="medical-centers">
    <div className="medical-center-header">
      <h3>ELISTER Medical Centers</h3>
      <a href="/" className="see-all">See All</a>
    </div>
    <div className="medical-center-card">
      <img src={penangImage} alt="Medical Center" className="medical-center-image" />
      <div className="medical-center-info">
        <h4>ELISTER Medical Centers (Penang)</h4>
        <p>📍 123 Jalan Tengah, Bayan Lepas</p>
        <p>⭐ 5.0 (58 Reviews)</p>
        <p>🚗 2.5 km / 40 min</p>
      </div>
    </div>
  </section>
);

export default Home;
