require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetflow';

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic API Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'FleetFlow Backend is running' });
});

// Auth Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/maintenance', require('./routes/maintenance'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/drivers', require('./routes/drivers'));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
