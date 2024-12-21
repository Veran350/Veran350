const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');  // Import the User model
const Product = require('./models/Product');
const Activity = require('./models/Activity'); // Model for activity logs
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

// Admin authentication (hardcoded)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

// Admin login route (just for testing purposes)
app.post('/admin-login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true; // Set admin session flag
        return res.redirect('/admin');
    }

    res.status(401).send('Invalid credentials');
});

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.session.isAdmin) {
        return next();
    } else {
        res.status(403).send('Access denied. Admins only.');
    }
}

// Admin routes (only accessible if logged in as admin)
app.get('/admin', isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        const products = await Product.find();
        const activities = await Activity.find();
        
        res.json({
            users,
            products,
            activities
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching admin data');
    }
});

// Example route to log activities (e.g., product added)
app.post('/log-activity', async (req, res) => {
    const { action, details } = req.body;

    try {
        const newActivity = new Activity({ action, details });
        await newActivity.save();
        res.status(201).send('Activity logged');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging activity');
    }
});

// Route to insert sample products when the server starts (for seeding)
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

// **Routes for Buyer/Seller Registration and Login**

app.post('/signup', async (req, res) => {
    const { email, password, role, name } = req.body;

    // Ensure role is either buyer or seller
    if (!['buyer', 'seller'].includes(role)) {
        return res.status(400).send('Invalid role');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            name
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login route (use passport for authentication)
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.send('Logged in successfully');
});

// **Role-based Access (Optional)**

function isSeller(req, res, next) {
    if (req.user && req.user.role === 'seller') {
        return next();
    }
    res.status(403).send('Access denied. Sellers only.');
}

function isBuyer(req, res, next) {
    if (req.user && req.user.role === 'buyer') {
        return next();
    }
    res.status(403).send('Access denied. Buyers only.');
}

// Seller-specific route (only accessible if logged in as seller)
app.get('/seller-dashboard', isSeller, (req, res) => {
    res.send('Welcome to the Seller Dashboard');
});

// Buyer-specific route (only accessible if logged in as buyer)
app.get('/buyer-dashboard', isBuyer, (req, res) => {
    res.send('Welcome to the Buyer Dashboard');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
