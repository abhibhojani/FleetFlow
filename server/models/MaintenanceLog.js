const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed'],
        default: 'Scheduled',
    },
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceLog', maintenanceLogSchema);
