require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./data/products.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json

// Serve static images from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('Road King Brake Lining API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});