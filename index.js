const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');  // Import the User model
const Product = require('./models/Product');
require('./config/passport')(passport); // Configure Passport.js

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

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

// Routes for user authentication
// Signup Route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        // Redirect to login
        res.status(201).send('User created, you can now log in');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing up');
    }
});

// Login Route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout Route
app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
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
