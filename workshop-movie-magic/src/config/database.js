const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
require('dotenv').config();

require('../models/Movie');
require('../models/Cast');
require('../models/User');


const connectionString = process.env.MONGODB;

async function configDatabase() {
    await mongoose.connect(connectionString);

    // await migrateMovies();

    console.log('Database connected');
}

module.exports = { configDatabase };

// Manual migration - adding user(author) to the movie

// async function migrateMovies() {
//     const firstUser = await User.findOne();

//     await Movie.updateMany({}, { $set: { author: firstUser._id } })
// }



