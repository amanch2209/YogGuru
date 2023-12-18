// App.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import logo from './images/logo.png';
import {useNavigate} from 'react-router-dom'

const App = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    selectedBatch: '',
    phone: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic client-side validation
      if (!formData.name || !formData.age || !formData.selectedBatch || !formData.phone) {
        toast.error('Please fill out all fields.');
        return;
      }
  
      if (formData.age < 18 || formData.age > 65) {
        toast.error('Age must be between 18 and 65.');
        return;
      }
  
      // Call the backend API to store data
      const response = await axios.post('http://localhost:3001/login', formData);
  
      // Mock payment function
      const paymentResponse = await CompletePayment(response.data);
  
      // Handle payment response in the frontend as needed
      toast.success(paymentResponse.message);
  
      // Reset the form
      setFormData({
        name: '',
        age: 18,
        phone: '',
        selectedBatch: '',
      });
  
      alert('Admission successful!');
    } catch (error) {
      console.error('Error during admission:', error.message);
      toast.error('Error during admission. Please try again.');
    }
  };

  const PosTData = async(e) => {
    e.preventDefault();

    const {name, age, phone, selectedBatch} = formData;
    const res = await fetch("/login", {
      method: "POST",
      headers : {
        "Content-Type" :  "application/json"
      },
      body:JSON.stringify({
        name, age, phone, selectedBatch
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
    <div className='container'>
      <header>
        <img src={logo} alt="Yoga Class Logo" className='logo' />
        <p className='h1'>YogGuru Admission Form</p>
      </header>
      <main>
        <form method="POST" onSubmit={handleSubmit}>
          <label>
            <p>Name:</p>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
          <p>Age:</p>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
          </label>
          <label>
          <p>Phone Number:</p>
            <input name="phone" value={formData.phone} onChange={handleInputChange} />
          </label>
          <label>
          <p>Select Batch:</p>
            <select name="selectedBatch" value={formData.selectedBatch} onChange={handleInputChange}>
              <option value="">Select a batch</option>
              <option value="6-7AM">6-7 AM</option>
              <option value="7-8AM">7-8 AM</option>
              <option value="8-9AM">8-9 AM</option>
              <option value="5-6PM">5-6 PM</option>
            </select>
          </label>
          <br />
            <a href="/" target="_blank" rel="noopener noreferrer">
            <button type="submit">Make Payment</button>
            </a>          
        </form>
      </main>
      <ToastContainer />
    </div>
  );  
};

export default App;
