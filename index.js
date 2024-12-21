const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Product = require('./models/Product'); // Your product model

const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shopify-clone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Route to get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.json(products); // Send the products as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
});

// Inserting sample products when the server starts (for seeding)
const seedData = async () => {
    const products = [
        { name: "Product 1", price: 29.99, description: "Description of product 1", imageUrl: "https://via.placeholder.com/150" },
        { name: "Product 2", price: 39.99, description: "Description of product 2", imageUrl: "https://via.placeholder.com/150" },
        { name: "Product 3", price: 49.99, description: "Description of product 3", imageUrl: "https://via.placeholder.com/150" }
    ];

    try {
        await Product.insertMany(products); // Insert the sample products into the database
        console.log('Sample products inserted');
    } catch (error) {
        console.error('Error inserting sample products:', error);
    }
};

// Call the seed function to add products when the server starts
seedData();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
