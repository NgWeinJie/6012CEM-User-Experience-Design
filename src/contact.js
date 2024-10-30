import React, { useState } from 'react';
import './contact.css'; // Import the corresponding CSS

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+60'); // Default to Malaysia
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Confirmation modal state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Success message modal state

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

  const inquiryOptions = [
    "Operating Hours",
    "Appointments",
    "Billing",
    "General Inquiry",
    "Feedback"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmSubmit = () => {
    // Handle form submission logic here
    console.log({ email, phone, message, inquiryType });
    setIsConfirmationModalOpen(false); // Close the modal after confirmation
    setIsSuccessModalOpen(true); // Open the success message modal
  };

  const handleCancelSubmit = () => {
    setIsConfirmationModalOpen(false); // Close the modal without submitting
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false); // Close the success modal
    // Clear the message field and reset other fields if desired
    setMessage(''); // Clear the message
    setEmail(''); // Optionally clear the email
    setPhone(''); // Optionally clear the phone
    setInquiryType(''); // Optionally clear the inquiry type
  };

  return (
    <div className="contact-us-container">
      <h2 className="contact-us-title">Contact Us</h2>
      <div className="contact-us-form-background">
        <form onSubmit={handleSubmit}>
          <div className="contact-us-item">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="eg: john@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="contact-us-item">
            <label>Phone Number</label>
            <div className="contact-number-container">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} - {country.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                placeholder="Your number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="contact-us-item">
            <label>Inquiry Type</label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              required
              className="inquiry-type-dropdown"
            >
              <option value="">Select an inquiry</option>
              {inquiryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="contact-us-item">
            <label>Share Your Message</label>
            <textarea
              value={message}
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-us-submit-button">Submit</button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to submit your inquiry?</p>
            <button onClick={handleConfirmSubmit} className="modal-confirm-button">Yes</button>
            <button onClick={handleCancelSubmit} className="modal-cancel-button">No</button>
          </div>
        </div>
      )}

      {/* Success Message Modal */}
      {isSuccessModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Thank You!</h3>
            <p>Your message has been submitted. We will get back to you shortly.</p>
            <button onClick={handleCloseSuccessModal} className="modal-confirm-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
