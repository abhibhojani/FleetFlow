const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// @route   GET /api/drivers
// @desc    Get all drivers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.find().sort({ createdAt: -1 });
        const formattedDrivers = drivers.map(d => {
            const obj = d.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });
        res.json(formattedDrivers);
    } catch (err) {
        console.error("GET Drivers Error:", err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/drivers
// @desc    Create a new driver
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newDriver = new Driver(req.body);
        const driver = await newDriver.save();

        const formattedDriver = driver.toObject();
        formattedDriver.id = formattedDriver._id.toString();
        delete formattedDriver._id;
        delete formattedDriver.__v;

        res.status(201).json(formattedDriver);
    } catch (err) {
        console.error("POST Drivers Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/drivers/:id
// @desc    Update a driver
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!driver) return res.status(404).json({ message: 'Driver not found' });

        const formattedDriver = driver.toObject();
        formattedDriver.id = formattedDriver._id.toString();
        delete formattedDriver._id;
        delete formattedDriver.__v;

        res.json(formattedDriver);
    } catch (err) {
        console.error("PUT Drivers Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/drivers/:id
// @desc    Delete a driver
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.json({ message: 'Driver profile removed' });
    } catch (err) {
        console.error("DELETE Drivers Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
