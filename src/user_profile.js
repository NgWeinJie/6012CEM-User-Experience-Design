import React, { useState } from 'react';
import './user_profile.css'; // Import the corresponding CSS
import profileImage from './image/profile.png'; // Replace with the correct path to your uploaded image

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [name, setName] = useState("Abdullah Mamun");
  const [email, setEmail] = useState("AbdullahMamun12@gmail.com");
  const [contact, setContact] = useState("+601180054200");
  const [countryCode, setCountryCode] = useState("+60"); // Default to Malaysia

  // Store original values to revert if canceled
  const [originalName, setOriginalName] = useState(name);
  const [originalEmail, setOriginalEmail] = useState(email);
  const [originalContact, setOriginalContact] = useState(contact);

  // Country codes
  const countryCodes = [
    { code: "+60", country: "Malaysia" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+61", country: "Australia" },
    { code: "+55", country: "Brazil" },
    { code: "+64", country: "New Zealand" },
  ];

  // Toggle edit mode
  const handleEditClick = () => {
    // Store original values when editing begins
    setOriginalName(name);
    setOriginalEmail(email);
    setOriginalContact(contact);
    setIsEditing(true);
  };

  // Show confirmation modal before updating
  const handleUpdateClick = () => {
    setShowModal(true);
  };

  // Confirm the update
  const handleConfirmUpdate = () => {
    setIsEditing(false);
    setShowModal(false);
    // Here, you can handle saving the updated information (e.g., making an API call)
  };

  // Cancel changes
  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset fields to original values
    setName(originalName);
    setEmail(originalEmail);
    setContact(originalContact);
    setCountryCode(originalContact.slice(0, 3)); // Extract country code from the contact number
  };

  // Cancel modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="user-profile-container">
      <header className="user-profile-header">
        <h2 className="user-profile-title">Profile</h2>
      </header>

      <section className="user-profile-setup">
        <h3>Set up your profile</h3>
        <p>Update your profile to connect with your doctor and make a better impression.</p>

        <div className="user-profile-picture">
          <img src={profileImage} alt="Profile" className="user-profile-image" />
          <button className="user-profile-edit-image-button">📷</button>
        </div>
      </section>

      <section className="user-profile-info">
        <h3>Personal Information</h3>
        <div className="user-profile-info-item">
          <label>Name</label>
          <input
            type="text"
            value={name}
            readOnly={!isEditing}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="user-profile-info-item">
          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="user-profile-info-item">
          <label>Contact Number</label>
          <div className="contact-number-container">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={!isEditing} // Disable when not editing
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} - {country.country}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={contact.replace(countryCode, '')} // Remove the country code for input
              readOnly={!isEditing}
              onChange={(e) => setContact(`${countryCode}${e.target.value}`)} // Keep country code with contact number
              placeholder="Your number"
            />
          </div>
        </div>
      </section>

      <div className="user-profile-button-group">
        <button
          className="user-profile-edit-button"
          onClick={isEditing ? handleUpdateClick : handleEditClick}
        >
          {isEditing ? "Update" : "Edit"}
        </button>
        {isEditing && (
          <button
            className="user-profile-cancel-button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content">
            <h3>Confirm Update</h3>
            <p>Are you sure you want to update your profile?</p>
            <div className="modal-button-group">
              <button className="modal-confirm-button" onClick={handleConfirmUpdate}>
                Yes, Update
              </button>
              <button className="modal-cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
