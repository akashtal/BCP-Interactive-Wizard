const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bcp-wizard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/bcp', require('./routes/bcp'));
app.use('/api/sites', require('./routes/sites'));
app.use('/api/owners', require('./routes/owners'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BCP Wizard API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});