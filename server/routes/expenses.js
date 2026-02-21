const express = require('express');
const router = express.Router();
const ExpenseLog = require('../models/ExpenseLog');

// @route   GET /api/expenses
// @desc    Get all expense logs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const logs = await ExpenseLog.find().sort({ date: -1 });
        const formattedLogs = logs.map(l => {
            const obj = l.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });
        res.json(formattedLogs);
    } catch (err) {
        console.error("GET Expenses Error:", err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/expenses
// @desc    Create an expense log
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newLog = new ExpenseLog(req.body);
        const log = await newLog.save();

        const formattedLog = log.toObject();
        formattedLog.id = formattedLog._id.toString();
        delete formattedLog._id;
        delete formattedLog.__v;

        res.status(201).json(formattedLog);
    } catch (err) {
        console.error("POST Expenses Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/expenses/:id
// @desc    Update an expense log
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const log = await ExpenseLog.findByIdAndUpdate(
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
        console.error("PUT Expenses Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense log
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const log = await ExpenseLog.findByIdAndDelete(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.json({ message: 'Expense log removed' });
    } catch (err) {
        console.error("DELETE Expenses Error:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
