const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    photos: [String],
    createdDate: {
        type: Date,
        default: Date.now()
    },
    tripDate: {
        type: Date,
        required: true
    },
    park: {
        type: String,
        required: true
    },
    comments: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

module.exports = mongoose.model('Trip', tripSchema);