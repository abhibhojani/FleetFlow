const express = require('express');
const router = express.Router();
const MaintenanceLog = require('../models/MaintenanceLog');

// @route   GET /api/maintenance
// @desc    Get all maintenance logs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const logs = await MaintenanceLog.find().sort({ createdAt: -1 });
        const formattedLogs = logs.map(l => {
            const obj = l.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });
        res.json(formattedLogs);
    } catch (err) {
        console.error("GET Maintenance Error:", err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/maintenance
// @desc    Create a maintenance log
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newLog = new MaintenanceLog(req.body);
        const log = await newLog.save();

        const formattedLog = log.toObject();
        formattedLog.id = formattedLog._id.toString();
        delete formattedLog._id;
        delete formattedLog.__v;

        res.status(201).json(formattedLog);
    } catch (err) {
        console.error("POST Maintenance Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/maintenance/:id
// @desc    Update a maintenance log
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const log = await MaintenanceLog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!log) return res.status(404).json({ message: 'Log not found' });

        const formattedLog = log.toObject();
        formattedLog.id = formattedLog._id.toString();
        delete formattedLog._id;
        delete formattedLog.__v;

        res.json(formattedLog);
    } catch (err) {
        console.error("PUT Maintenance Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
