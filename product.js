const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String, // URL for the product image
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
