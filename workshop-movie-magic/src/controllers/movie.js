const { createMovie } = require('../services/movie')
const pageTitle = 'Create Movie';

module.exports = {

    createGet: (req, res) => {
        res.render('create', {title:pageTitle})
    },
    createPost: async (req, res) => {
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
            res.render('create', { movie: req.body, errors});
            return;
        }

        const result = await createMovie(req.body);

        res.redirect('/details/' + result._id);
    }
}