const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
    },
    maxLoadCapacity: {
        type: Number,
    },
    odometer: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Available', 'On Trip', 'In Shop', 'Out of Service'],
        default: 'Available',
    },
    type: {
        type: String,
        enum: ['Truck', 'Van', 'Car', 'Bike'],
        default: 'Truck',
    },
    region: {
        type: String,
        default: 'North',
    },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
