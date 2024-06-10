const { getAllMovies, getMovieById } = require("../services/movie");
const { findMovieAdded } = require("../utils/util");

// const jwt = require('jsonwebtoken');
// require('dotenv').config()

module.exports = {
    home: async (req, res) => {

        const movies = await getAllMovies();

        for (const movie of movies) {
            movie.isAuthor = req.user && req.user._id == movie.author.toString();
        }

        res.render('home', { movies, title: 'Catalog' });
    },
    details: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        movie.isAuthor = req.user && req.user._id == movie.author.toString();
        movie.starRating = '&#x2605;'.repeat(movie.rating);

        res.render('details', { movie, title: movie.title.slice(0, 20) });
    },
    search: async (req, res) => {
        let movies = await getAllMovies();
        let results = [];
        let foundMovie = true;
        let initialState = true;
        let filteredMovies = []


        if (Object.keys(req.query).length == 0) {
            results = movies;
        } else {
            initialState = false;
        }
        if (Object.values(req.query).every(v => v == '')) {
            foundMovie = false;
            results = [];

        } else {
            const { title, genre, year } = req.query;


            if (title !== '') {
                filteredMovies = (movies.filter(m => m.title.toLowerCase().includes(title.toLowerCase())));

                if (filteredMovies.length > 0) {
                    results = filteredMovies;
                    filteredMovies = []
                }
            }
            if (genre !== '') {

                filteredMovies = movies.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));

                if (filteredMovies.length > 0) {
                    results = findMovieAdded(results, filteredMovies)
                    filteredMovies = []
                }
            }
            if (year !== '') {
                filteredMovies = movies.filter(m => m.year === Number(year));

                if (filteredMovies.length > 0) {
                    results = findMovieAdded(results, filteredMovies)
                    filteredMovies = []
                }
            }
            if (results.length === 0) {
                foundMovie = false;
            }

        }

        res.render('search', { title: 'Search', movies, results, foundMovie, initialState });
    }
}