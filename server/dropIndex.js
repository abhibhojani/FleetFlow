require('dotenv').config();
const mongoose = require('mongoose');

async function dropBadIndex() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");
        const result = await mongoose.connection.collection('vehicles').dropIndex('license_plate_1');
        console.log("Result of dropIndex:", result);
    } catch (err) {
        if (err.codeName === 'IndexNotFound') {
            console.log("Index already dropped or not found.");
        } else {
            console.error("Error dropping index:", err);
        }
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
        process.exit(0);
    }
}

dropBadIndex();
