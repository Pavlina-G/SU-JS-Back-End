const fs = require('fs/promises');
const { Movie } = require('../models/Movie');


const filePath = './data/database.json';

async function readMovies() {
    const movies = await fs.readFile(filePath);
    
    return JSON.parse(movies.toString());
}

async function saveMovie(movie) {
    await fs.writeFile(filePath, JSON.stringify(movie));
}

function makeMovieModel(data) {
    const movie = new Movie;

    movie.id = data.id;
    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = data.year;
    movie.imageURL = data.imageURL;
    movie.rating = data.rating;
    movie.description = data.description;

    return movie;
}

async function getAllMovies() {
    const movies = await readMovies();
    return movies.map(makeMovieModel);
}

async function getMovieById(id) {
    const movies = await readMovies();

    const movie = movies.find(m => m.id == id);

    return movie ? makeMovieModel(movie) : movie //undefined;
}

async function createMovie(movieData) {
    const id = uuid();

    const movie = {
        id,
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        imageURL: movieData.imageURL,
        rating: Number(movieData.rating),
        description: movieData.description
    };

    const movies = await readMovies();
    movies.push(movie);
    await saveMovie(movies);

    return makeMovieModel(movie);
}

function uuid() {
    return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 12 | 0).toString(16));
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
}
