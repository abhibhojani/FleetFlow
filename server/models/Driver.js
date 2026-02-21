const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    licenseExpiry: {
        type: Date,
        required: true,
    },
    safetyScore: {
        type: Number,
        required: true,
        default: 100,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Suspended', 'On Trip'],
        default: 'Active',
        required: true
    },
    isOnDuty: {
        type: Boolean,
        default: false
    },
    suspendDate: {
        type: Date,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    assignedVehicleId: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
