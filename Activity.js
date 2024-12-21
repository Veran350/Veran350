const mongoose = require('mongoose');

// Activity schema to log actions
const activitySchema = new mongoose.Schema({
    action: { type: String, required: true },
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
