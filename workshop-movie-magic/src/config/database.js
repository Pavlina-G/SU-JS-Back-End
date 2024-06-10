const mongoose = require("mongoose");
require('dotenv').config();

require('../models/Movie');
require('../models/Cast');
require('../models/User');


const connectionString = process.env.MONGODB;

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };

