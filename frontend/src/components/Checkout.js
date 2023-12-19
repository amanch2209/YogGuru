import React, { useState } from 'react';
import '../components/style.css'
import logo from '../images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from '../components/Home'

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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

  const CompletePayment = async (userData) => {
    // Mock payment function (replace with actual payment processing logic)

    console.log('Processing payment for:', userData);
    return { success: true, message: 'Payment successful' };
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add logic for handling the checkout submission (e.g., payment processing)
    console.log('Form submitted:', formData);
    try {
      // Basic client-side validation
      if (!formData.fullName || !formData.email || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        toast.error('Please fill out all fields.');
        return;
      }

    const response = await axios.post('https://yog-guru-backend-api.vercel.app/payments', formData);
  
      const userData = response.data;
      const paymentResponse = await CompletePayment(userData);

      setFormData({
        fullName: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      })
      if (paymentResponse.success) {
        // toast.success(paymentResponse.message);
        alert('Admission successful!');
        navigate('/')
      } else {
        toast.error(paymentResponse.message);
      }
    } catch (error) {
      console.error('Error during admission:', error.message);
      toast.error('Error during admission. Please try again.');
    }
    // You can call your payment processing function or API here
  };

  const PosTData = async(e) => {
    e.preventDefault();

    const {fullName, email, cardNumber, expiryDate, cvv} = formData;
    const res = await fetch("/payment", {
      method: "POST",
      headers : {
        "Content-Type" :  "application/json"
      },
      body:JSON.stringify({
        fullName, email, cardNumber, expiryDate, cvv
      })
    });

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid")
    }
    else{
      window.alert("Success");
      console.log("Success");

      // navigate.push("/login");
    }
  }

  return (
    <div className="checkout-container">
      
      <div>
        <p className='h1'>YogGuru Payment</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Monthly Fee: ₹500</h4>
        </label>
        <label>
          <p>Name:</p>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </label>
        <label>
          <p>Email:</p>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <label>
          <p>Card Number:</p>
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
        </label>
        <div className="card-details">
          <div>
            <label>
              <p>Expiry Date:</p>
              <input type="month" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
            </label>
          </div>
          <div>
            <label>
              <p>CVV:</p>
              <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
            </label>
          </div>
        </div>
        <button type="submit" id='checkoutButton'>Proceed to Payment</button>
      </form>
      {window.location.pathname === '../components/Home' && <Home />}
    </div>
  );
};

export default Checkout;
