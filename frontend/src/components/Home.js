// App.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css'
import Header from './Header'
import Checkout from './Checkout';
import { useNavigate } from 'react-router-dom';


const App = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    selectedBatch: '',
    phone: '',
    email:''
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
      if (!formData.name || !formData.age || !formData.selectedBatch || !formData.phone || !formData.email) {
        toast.error('Please fill out all fields.');
        return;
      }
  
      if (formData.age < 18 || formData.age > 65) {
        toast.error('Age must be between 18 and 65.');
        return;
      }
  
      // Call the backend API to store data
      const response = await axios.post('https://real-pink-bass-boot.cyclic.app', formData);
  
      const userData = response.data;

      // Process payment using the CompletePayment function
      const paymentResponse = await CompletePayment(userData);
      // Reset the form
      setFormData({
        name: '',
        age: 18,
        phone: '',
        email: '',
        selectedBatch: '',
      });

  
      if (paymentResponse.success) {
        toast.success(paymentResponse.message);
        navigate('/checkout');
        // alert('Admission successful!');
      } else {
        toast.error(paymentResponse.message);
      }
    } catch (error) {
      console.error('Error during admission:', error.message);
      toast.error('Error during admission. Please try again.');
    }
  };

  // const handleMakePayment = () => {
    

  // }
  const PosTData = async(e) => {
    e.preventDefault();

    const {name, age, phone, email, selectedBatch} = formData;
    const res = await fetch("/login", {
      method: "POST",
      headers : {
        "Content-Type" :  "application/json"
      },
      body:JSON.stringify({
        name, age, phone, email, selectedBatch
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
      <Header></Header>
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
          <p>Email:</p>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
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
          <button type="submit" id='checkoutButton' >Make Payment</button> 
        </form>
        {window.location.pathname === '../components/Checkout' && <Checkout />}
      </main>
      <ToastContainer />
    </div>
  );  
};

export default App;
