const { createMovie, getMovieById, updateMovie, deleteMovie } = require('../services/movie')
const pageTitle = 'Create Movie';
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../utils/util');

const movieRouter = Router();

// Refactor routes:
// router.get('/create/movie', isUser(), createGet);
// router.post('/create/movie', isUser(), createPost);
// router.get('/edit/movie/:id', isUser(), editGet);
// router.post('/edit/movie/:id', isUser(), editPost);
// router.get('/delete/movie/:id', isUser(), deleteGet);
// router.post('/delete/movie/:id', isUser(), deletePost);


movieRouter.get(
    '/create/movie',
    isUser(),
    (req, res) => {
        res.render('create', { title: pageTitle })
    }
);

movieRouter.post(
    '/create/movie',
    isUser(),
    //Adding validator
    body('imageURL').trim().isURL().withMessage('Please enter valid URL for movie poster'),
    async (req, res) => {

        const authorId = req.user._id

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await createMovie(req.body, authorId);

            res.redirect('/details/' + result._id);

        } catch (err) {
            res.render('create', { movie: req.body, errors: parseError(err).errors });
        }
    }
);

movieRouter.get(
    '/edit/movie/:id',
    isUser(),
    async (req, res) => {
        const movieId = req.params.id;

        let movie;

        try {
            movie = await getMovieById(movieId);

            if (!movie) {
                throw new Error('Movie not found');
            }
        } catch (err) {
            console.log(err);
            res.render('404');
            return;
        }

        const isAuthor = req.user._id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return;
        }

        res.render('edit', { movie });
    }
);

movieRouter.post(
    '/edit/movie/:id',
    isUser(),
    async (req, res) => {
        const movieId = req.params.id;
        const authorId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await updateMovie(movieId, authorId, req.body)
            res.redirect('/details/' + result._id);
        } catch (err) {
            res.render('edit', { movie: req.body, errors: parseError(err).errors });
        }
    }
);

movieRouter.get(
    '/delete/movie/:id',
    isUser(),
    async (req, res) => {

        const movieId = req.params.id;

        let movie;

        try {
            movie = await getMovieById(movieId);

            if (!movie) {
                throw new Error('Movie not found');
            }
        } catch (err) {
            res.render('404');
            return;
        }

        const isAuthor = req.user._id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return;
        }

        res.render('delete', { movie });
    }
);

movieRouter.post(
    '/delete/movie/:id',
    isUser(),
    async (req, res) => {

        const movieId = req.params.id;
        const userId = req.user._id;

        try {
            await deleteMovie(movieId, userId);
        } catch (err) {
            if (err.message == 'Access denied') {
                res.redirect('/login');
            } else {
                console.log(err.message);
                res.render('404');
            }
            return;
        }
        res.redirect('/');
    }
);

module.exports = { movieRouter };