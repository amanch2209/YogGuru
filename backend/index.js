// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yoga-class', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define the YogaClass schema
const yogaClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  selectedBatch: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create a model based on the schema
const YogaClass = mongoose.model('YogaClass', yogaClassSchema);

// Endpoint for admitting a participant
app.post('/admission', async (req, res) => {
  try {
    // Basic server-side validation
    const { name, age, selectedBatch } = req.body;

    if (!name || age < 18 || age > 65 || !selectedBatch) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    // Create a new YogaClass instance
    const newAdmission = new YogaClass({
      name,
      age,
      selectedBatch,
    });

    // Save the data to the database
    await newAdmission.save();

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
