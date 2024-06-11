const { createMovie, getMovieById, updateMovie, deleteMovie } = require('../services/movie')
const pageTitle = 'Create Movie';

module.exports = {

    createGet: (req, res) => {
        res.render('create', { title: pageTitle })
    },
    createPost: async (req, res) => {
        //TODO - add guard to the authorId

        const authorId = req.user._id

        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            rating: !req.body.rating,
            description: !req.body.description,
            imageURL: !req.body.imageURL
        };

        // console.log(errors);

        if (Object.values(errors).includes(true)) {
            res.render('create', { movie: req.body, errors });
            return;
        }

        const result = await createMovie(req.body, authorId);

        res.redirect('/details/' + result._id);
    },
    editGet: async (req, res) => {
        const movieId = req.params.id;

        const movie = await getMovieById(movieId);

        if (!movie) {
            res.render('404');
            return;
        }

        const isAuthor = req.user._id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return
        }

        res.render('edit', { movie })
    },
    editPost: async (req, res) => {
        const movieId = req.params.id;
        const authorId = req.user._id;

        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            rating: !req.body.rating,
            description: !req.body.description,
            imageURL: !req.body.imageURL
        };

        if (Object.values(errors).includes(true)) {
            res.render('edit', { movie: req.body, errors });
            return;
        }

        try {
            await updateMovie(movieId, authorId, req.body)
        } catch (err) {
            if (err.message == 'Access denied') {
                res.redirect('/login');
            } else {
                res.render('404');
            }
            return
        }
        res.redirect('/details/' + movieId);
    },
    deleteGet: async (req, res) => {
        const movieId = req.params.id;

        const movie = await getMovieById(movieId);

        if (!movie) {
            res.render('404');
            return;
        }

        const isAuthor = req.user._id == movie.author.toString();

        if (!isAuthor) {
            res.redirect('/login');
            return
        }

        res.render('delete', { movie })
    },
    deletePost: async (req, res) => {
        const movieId = req.params.id;
        const userId = req.user._id;

        try {
            await deleteMovie(movieId, userId);
        } catch (err) {
            if (err.message == 'Access denied'){
                res.redirect('/login');
            } else {
                console.log(err.message);
                res.render('404');
            }
            return;
        }
        res.redirect('/');
    }
}