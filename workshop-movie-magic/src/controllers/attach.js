const { getMovieById, attachCastToMovie } = require('../services/movie');
const { getAllCast } = require('../services/cast');
const { Movie } = require('../models/Movie');

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }
        const isAuthor = req.user._id == movie.author.toString();
        
        if (!isAuthor) {
            res.redirect('/login');
            return
        }

        const allCast = await getAllCast();
    
        const castInMovie = movie.cast;

        res.render('cast-attach', { movie, allCast: allCast.filter(c => !castInMovie.find(cast => cast._id.toString() == c._id.toString())) });
    },
    attachPost: async (req, res) => {
        const movieId = req.params.id;
        const castId = req.body.cast;
        const userId = req.user._id;
        const movie = await Movie.findById(movieId);

        if (!movieId || !castId) {
            console.error(`Missing ${movieId} or ${castId}`);
            res.status(400).end();
            return;
        }

        if (castId == 'none') {
            const movie = await getMovieById(movieId);
            const allCast = await getAllCast();
            res.render('cast-attach', { movie, allCast, error: true });

            return;
        }

        try {
            await attachCastToMovie(movieId, castId, userId);
        } catch (err) {
            if (err.message == 'Access denied') {
                res.redirect('/login');
            // console.error('Error adding cast to movie', err);
            }
            else {
                res.render('404');
            }
            // res.status(400).end();
            return;
        }

        res.redirect('/details/' + movieId);
    }
};