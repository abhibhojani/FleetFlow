const mongoose = require('mongoose');

const ExpenseLogSchema = new mongoose.Schema({
    vehicleId: {
        type: String, // String to match frontend standard ID format
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['Fuel', 'Maintenance', 'Other'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    liters: {
        type: Number, // Optional, only applicable if type is Fuel
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('ExpenseLog', ExpenseLogSchema);
