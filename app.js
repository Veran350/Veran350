const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock products data
const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 10.99,
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 20.99,
        imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 30.99,
        imageUrl: 'https://via.placeholder.com/150'
    }
];

// API endpoint to fetch products
app.get('/products', (req, res) => {
    res.json(products);
});

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
