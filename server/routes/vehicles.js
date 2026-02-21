const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// GET all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });
        // Transform _id to id for the frontend
        const formattedVehicles = vehicles.map(v => {
            const vehicleObj = v.toObject();
            vehicleObj.id = vehicleObj._id.toString();
            delete vehicleObj._id;
            delete vehicleObj.__v;
            return vehicleObj;
        });
        res.json(formattedVehicles);
    } catch (err) {
        console.error("GET Vehicles Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new vehicle
router.post('/', async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        const vehicle = await newVehicle.save();

        const formattedVehicle = vehicle.toObject();
        formattedVehicle.id = formattedVehicle._id.toString();
        delete formattedVehicle._id;
        delete formattedVehicle.__v;

        res.status(201).json(formattedVehicle);
    } catch (err) {
        console.error("POST Vehicle Error:", err.message);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'License Plate already exists' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT (update) an existing vehicle
router.put('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const formattedVehicle = vehicle.toObject();
        formattedVehicle.id = formattedVehicle._id.toString();
        delete formattedVehicle._id;
        delete formattedVehicle.__v;

        res.json(formattedVehicle);
    } catch (err) {
        console.error("PUT Vehicle Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a vehicle
router.delete('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle removed successfully' });
    } catch (err) {
        console.error("DELETE Vehicle Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
