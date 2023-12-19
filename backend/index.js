// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002

app.use(cors(
  {
    origin : [],
    methods : ["POST"],
    credentials : true
  }
));
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
  email: {type:String, required: true},
  selectedBatch: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  cvv: { type: Number, required: true, min: 100, max:999},
  timestamp: { type: Date, default: Date.now },
});

// payment gateway


// Create a model based on the schema
const YogaClass = mongoose.model('login', yogaClassSchema);
const Payment = mongoose.model('payment', paymentSchema);

app.get('/', (req,res)=>{
  res.json("Hello");
})
// Endpoint for admitting a participant
app.post('/login', async (req, res) => {
  try {
    // Basic server-side validation
    const { name, age, phone, email, selectedBatch } = YogaClass(req.body);

    if (!name || !selectedBatch) {
      return res.status(400).json({ error: 'Name and selectedBatch are required fields' });
    }

    // Create a new YogaClass instance
    const newAdmission = new YogaClass({
      name,
      age,
      phone,
      email,
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

app.post('/payment', async (req, res) => {
  try {
    const { fullName, email, cardNumber, expiryDate, cvv } = req.body;

    if (!fullName || !email || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ error: 'All payment fields are required' });
    }

    const newPayment = new Payment({
      fullName,
      email,
      cardNumber,
      expiryDate,
      cvv,
    });
    const save_payment = await newPayment.save();

    return res.status(200).json({ message: 'Payment successful' });

  } catch (error) {
    console.error('Error during payment:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
