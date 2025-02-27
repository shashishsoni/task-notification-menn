require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notificationRoutes = require('./routes/notification');
const userRoutes = require('./routes/user');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

// Route to display available API endpoints
app.get('/api/routes', (req, res) => {
  res.json({
    message: 'Available Routes',
    routes: {
      '/api/notifications/send-sms': 'Send an SMS notification',
      '/api/notifications': 'Manage notifications',
      '/api/users': 'Manage users',
      '/api/createuser': 'Create a new user'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});