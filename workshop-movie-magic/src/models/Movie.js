// class Movie {
//     id;
//     title;
//     genre;
//     director;
//     year;
//     imageURL;
//     rating;
//     description;
// }

const { Schema, SchemaTypes: Types, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true,
        min: 1878,
        max: 2099
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    imageURL: {
        type: String,
        required: true,
        regexp: /^https?:\/\/.+/
    },
    cast: {
        type: [Types.ObjectId],
        ref: 'Cast',
        default: []
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Movie = model('Movie', movieSchema)

module.exports = { Movie };