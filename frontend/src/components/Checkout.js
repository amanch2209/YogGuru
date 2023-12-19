import React, { useState } from 'react';
import '../components/style.css'
import logo from '../images/logo.png'

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling the checkout submission (e.g., payment processing)
    console.log('Form submitted:', formData);
    // You can call your payment processing function or API here
  };

  return (
    <div className="checkout-container">
      
      <div>
        <p className='h1'>YogGuru Payment</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Full Name:</p>
          <input type="text" name="Name" value={formData.fullName} onChange={handleInputChange} required />
        </label>
        <label>
          <p>Email:</p>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <label>
          <p>Address:</p>
          <textarea name="address" value={formData.address} onChange={handleInputChange} required />
        </label>
        <label>
          <p>Card Number:</p>
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
        </label>
        <div className="card-details">
          <div>
            <label>
              <p>Expiry Date:</p>
              <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
            </label>
          </div>
          <div>
            <label>
              <p>CVV:</p>
              <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
            </label>
          </div>
        </div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
