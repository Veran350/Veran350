// Import necessary modules
const express = require('express');
const cors = require('cors');
const path = require('path');
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const app = express();
const PORT = 3000;

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFyzUobF12L-QlVnklN-2uYKvhwqXdkyE",
    authDomain: "veran350-b6c53.firebaseapp.com",
    projectId: "veran350-b6c53",
    storageBucket: "veran350-b6c53.firebasestorage.app",
    messagingSenderId: "727775684680",
    appId: "1:727775684680:web:80f53b3b9c4ec3b6b1107d",
    measurementId: "G-EQE584VHBY"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock products data
const products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30.99, imageUrl: 'https://via.placeholder.com/150' }
];

// API endpoint to fetch products
app.get('/products', (req, res) => {
    res.json(products);
});

// API endpoint to add a product to the cart
app.post('/cart', (req, res) => {
    const { productId } = req.body;
    const product = products.find((p) => p.id === productId);
    if (product) {
        cart.push(product);
        res.status(201).json({ message: 'Product added to cart', cart });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// API endpoint to get the cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// API endpoint to clear the cart
app.delete('/cart', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared' });
});

// Authentication routes
// Sign-up route
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            res.status(201).json({ message: 'User created successfully!', user: userCredential.user });
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            res.status(200).json({ message: 'Login successful!', user: userCredential.user });
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
