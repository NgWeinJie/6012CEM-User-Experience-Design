import React, { useState } from 'react';
import './appointment.css'; // Import the corresponding CSS
import doctorJames from './image/Dr. James Robinson.png'; // Path to Dr. James Robinson image
import doctorDaniel from './image/Dr. Daniel Lee.png'; // Path to Dr. Daniel Lee image
import locationIcon from './image/location.png'; // Path to location icon
import cancelIcon from './image/cancel.png'; // Path to cancel icon

const Appointment = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // State to manage active tab
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for confirmation modal visibility
  const [isCancellationMessageVisible, setIsCancellationMessageVisible] = useState(false); // State for cancellation message visibility
  const [appointmentToCancel, setAppointmentToCancel] = useState(''); // State for the appointment to cancel
  const [cancelReason, setCancelReason] = useState(''); // State for the cancellation reason
  const [appointments, setAppointments] = useState([
    { id: 1, date: "May 22, 2023 - 10:00 AM", doctor: "Dr. James Robinson", specialization: "Orthopedic Surgery", hospital: "ELISTER Hospital (Penang)", image: doctorJames, isCanceled: false },
    { id: 2, date: "June 14, 2023 - 15:00 PM", doctor: "Dr. Daniel Lee", specialization: "Gastroenterologist", hospital: "ELISTER Hospital (Penang)", image: doctorDaniel, isCanceled: false },
  ]);

  const openConfirmModal = (doctor) => {
    setAppointmentToCancel(doctor);
    setIsConfirmModalOpen(true);
  };

  const confirmCancellation = () => {
    if (!cancelReason) {
      alert('Please select a reason for cancellation');
      return;
    }
    setIsConfirmModalOpen(false);
    setIsCancellationMessageVisible(true);
    
    // Update the appointment state to mark it as canceled and log the reason
    setAppointments((prev) =>
      prev.map(app =>
        app.doctor === appointmentToCancel ? { ...app, isCanceled: true, cancelReason } : app
      )
    );
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">My Appointment</h2>
      
      <div className="appointment-tabs">
        <button 
          className={`appointment-tab ${activeTab === 'upcoming' ? 'active' : ''}`} 
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`appointment-tab ${activeTab === 'history' ? 'active' : ''}`} 
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button 
          className={`appointment-tab ${activeTab === 'cancelled' ? 'active' : ''}`} 
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {activeTab === 'upcoming' && (
        <div className="appointment-row">
          {appointments.map((appointment) => (
            !appointment.isCanceled && ( // Only render if not canceled
              <div key={appointment.id} className="appointment-card">
                <p className="appointment-date">{appointment.date}</p>
                <hr className="appointment-divider" />
                <div className="appointment-details">
                  <img src={appointment.image} alt={appointment.doctor} className="doctor-image" />
                  <div className="doctor-info">
                    <h4 className="doctor-name">{appointment.doctor}</h4>
                    <p className="doctor-specialization">{appointment.specialization}</p>
                    <p className="doctor-hospital">
                      <img src={locationIcon} alt="Location" className="location-icon" /> 
                      {appointment.hospital}
                    </p>
                  </div>
                </div>
                <hr className="appointment-divider" />
                <button className="appointment-cancel-button" onClick={() => openConfirmModal(appointment.doctor)}>
                  Cancel Appointment
                </button>
              </div>
            )
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <img src={cancelIcon} alt="Cancel" className="cancel-icon" /> {/* Added Cancel Icon */}
              <h3>Do You want to cancel Appointment</h3>
            </div>
            <div className="modal-body">
              <p>Appointment with {appointmentToCancel} will be cancelled</p>
              <select 
                className="cancel-reason-dropdown"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              >
                <option value="">Select Reason</option>
                <option value="Scheduling Conflict">Scheduling Conflict</option>
                <option value="Medical Reason">Medical Reason</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="confirm-button" onClick={confirmCancellation}>
                Confirm
              </button>
              <button className="reject-button" onClick={() => setIsConfirmModalOpen(false)}>Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Message Modal */}
      {isCancellationMessageVisible && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Appointment Cancelled</h3>
            </div>
            <div className="modal-body">
              <p>Appointment with {appointmentToCancel} has been cancelled.</p>
              <p>Reason: {cancelReason}</p>
            </div>
            <div className="modal-footer">
              <button className="close-button" onClick={() => setIsCancellationMessageVisible(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="appointment-card">
          <p className="appointment-date">June 14, 2023 - 15:00 PM</p>
          <hr className="appointment-divider" />
          <div className="appointment-details">
            <img src={doctorDaniel} alt="Dr. Daniel Lee" className="doctor-image" />
            <div className="doctor-info">
              <h4 className="doctor-name">Dr. Daniel Lee</h4>
              <p className="doctor-specialization">Gastroenterologist</p>
              <p className="doctor-hospital">
                <img src={locationIcon} alt="Location" className="location-icon" />
                ELISTER Hospital (Penang)
              </p>
            </div>
          </div>
          <hr className="appointment-divider" />
        </div>
      )}

      {activeTab === 'cancelled' && appointments.filter(app => app.isCanceled).map(app => (
        <div key={app.id} className="appointment-card">
          <p className="appointment-date">{app.date}</p>
          <hr className="appointment-divider" />
          <div className="appointment-details">
            <img src={app.image} alt={app.doctor} className="doctor-image" />
            <div className="doctor-info">
              <h4 className="doctor-name">{app.doctor}</h4>
              <p className="doctor-specialization">{app.specialization}</p>
              <p className="doctor-hospital">
                <img src={locationIcon} alt="Location" className="location-icon" />
                {app.hospital}
              </p>
              <p>Cancelled Reason: {app.cancelReason}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointment;
