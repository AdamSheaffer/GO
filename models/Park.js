const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    parkCity: {
        type: String,
        required: true
    },
    teamCity: {
        type: String,
        require: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        address: {
            type: String,
            required: true
        },
        coordinates: [{
            type: Number,
            required: true
        }]
    },
    division: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Park', parkSchema);