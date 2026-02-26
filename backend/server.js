//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// connect to mongodb
const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());



// routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Stock Market API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
