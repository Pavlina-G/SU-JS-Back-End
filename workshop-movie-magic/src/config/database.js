const { config } = require("dotenv");
const mongoose = require("mongoose");
require('dotenv').config();

const connectionString = process.env.MONGODB;

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };

