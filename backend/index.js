// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json({limit : "10mb"})) // Use express.json() middleware to parse JSON in the request body

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err))

const db = mongoose.connection;

// Define the YogaClass schema
const yogaClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  phone: {type:Number, required: true},
  selectedBatch: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create a model based on the schema
const YogaClass = mongoose.model('login', yogaClassSchema);

// Endpoint for admitting a participant
app.post('/login', async (req, res) => {
  try {
    // Basic server-side validation
    const { name, age, phone, selectedBatch } = YogaClass(req.body);

    if (!name || !selectedBatch) {
      return res.status(400).json({ error: 'Name and selectedBatch are required fields' });
    }

    // Create a new YogaClass instance
    const newAdmission = new YogaClass({
      name,
      age,
      phone,
      selectedBatch,
    });

    // Save the data to the database
    const save = await newAdmission.save();

    // Assuming you have a function to complete the payment
    // const paymentResponse = CompletePayment({ name, age, selectedBatch });

    // Return a response to the frontend based on the payment response
    return res.status(200).json({ message: 'Admission successful' });

  } catch (error) {
    console.error('Error during admission:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
