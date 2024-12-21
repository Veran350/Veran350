const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product'); // Add this line at the top

const app = express();

// Middleware
app.use(bodyParser.json());

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

// New route below /products - Add a route to get a single product by ID
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id); // Find product by ID
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product); // Send the single product as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching product');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
