import React, { useState } from 'react';
import './message.css';
import { useNavigate } from 'react-router-dom';

// Image imports for doctors and logo
import drJasonImage from './image/Dr.Jason.png';
import drSilvaImage from './image/Dr.Silva.png';
import drPawaniImage from './image/Dr.Pawani.png';
import drRayanImage from './image/Dr.Rayan.png';
import drRoselinaImage from './image/Dr. Roselina.png'; 
import elisterLogoImage from './image/Elister logo.png';

const MessagePage = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messageInput, setMessageInput] = useState(""); // Input state for new message
  const [messages, setMessages] = useState([ // Initial chat messages
    { text: "hello, doctor, I believe I have the coronavirus as I am experiencing mild symptoms, what do I do?", type: "from-user", time: "10:13", status: "✔" },
    { text: "I'm here for you, don't worry. What symptoms are you experiencing?", type: "from-doctor", time: "10:14", status: "✔" },
    { text: "fever, dry cough, tiredness, sore throat", type: "from-user", time: "10:18", status: "✔" },
    { text: "Oh, so sorry about that. Do you have any underlying diseases?", type: "from-doctor", time: "10:15", status: "✔" }
  ]);

  // "Active Now" section with 5 doctors
  const activeDoctors = [
    { name: 'Dr.Jason', time: '12:50', active: true, img: drJasonImage },
    { name: 'Dr.Silva', time: '12:50', active: true, img: drSilvaImage },
    { name: 'Dr.Pawani', time: '12:50', active: true, img: drPawaniImage },
    { name: 'Dr.Rayan', time: '12:50', active: true, img: drRayanImage },
    { name: 'Dr.Roselina', time: '12:50', active: true, img: drRoselinaImage } // Add Dr. Roselina here
  ];

  // "Messages" section with 4 doctors
  const messageDoctors = [
    { name: 'Dr.Jason', time: '12:50', active: false, unread: 2, img: drJasonImage },
    { name: 'Dr.Silva', time: '12:50', active: false, unread: 0, img: drSilvaImage },
    { name: 'Dr.Pawani', time: '12:50', active: false, unread: 0, img: drPawaniImage },
    { name: 'Dr.Rayan', time: '12:50', active: false, unread: 0, img: drRayanImage }
  ];

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBackToMessages = () => {
    setSelectedDoctor(null);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        text: messageInput,
        type: "from-user", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        status: "" // Always a single tick
      };
      
      setMessages([...messages, newMessage]); 
      setMessageInput(""); 
    }
  };

  return (
    <div className="message-page-container">
      <header className="message-header">
        <h2>Message</h2>
      </header>

      <div className="message-content">
        <div className="chat-search-bar">
          <input type="text" placeholder="Search a Doctor" />
          <button className="search-button">🔍</button>
        </div>

        <div className="main-content">
          <div className="active-messages-section">
            <h3>Active Now</h3>
            <div className="active-doctors">
              {activeDoctors.map((doctor, index) => (
                <div key={index} className={`doctor-avatar ${doctor.active ? 'active' : ''}`}>
                  <img src={doctor.img} alt={doctor.name} />
                  <span className="status-dot"></span>
                </div>
              ))}
            </div>

            <h3>Messages</h3>
            <div className="messages-grid">
              {messageDoctors.map((doctor, index) => (
                <div key={index} className="message-card" onClick={() => handleDoctorClick(doctor)}>
                  <img src={doctor.img} alt={doctor.name} className="message-avatar" />
                  <div className="message-info">
                    <h4>{doctor.name}</h4>
                    <p> Worem consectetur adipiscing elit.</p>
                  </div>
                  <div className="message-time">
                    <span>{doctor.time}</span>
                    {doctor.unread > 0 && <span className="unread-count">{doctor.unread}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-panel">
            {selectedDoctor ? (
              <div className="chat-container">
                <header className="chat-header">
                  <button className="back-button" onClick={handleBackToMessages}>←</button>
                  <h3>{selectedDoctor.name}</h3>
                  <div className="chat-icons">
                    <button>📞</button>
                    <button>📹</button>
                  </div>
                </header>
                <div className="chat-messages">
                  {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                      {message.text}
                      <div className="message-info">
                        <span className="tick">{message.status}</span>
                        <span className="message-time">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <button className="voice-button">🎤</button>
                  <input
                    type="text"
                    placeholder="Write here"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)} // Update input value
                  />
                  <button className="send-button" onClick={handleSendMessage}>➤</button>
                </div>
              </div>
            ) : (
              <div className="logo-placeholder">
                <img src={elisterLogoImage} alt="Elister Health Care Logo" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
