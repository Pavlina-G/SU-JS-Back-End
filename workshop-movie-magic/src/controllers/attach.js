const { getMovieById } = require("../services/movie");

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        res.render('cast-attach', { movie });
    },
    attachPost: async (req, res) => {
        const movieId = req.params.id;
        const movie = await getMovieById(movieId);

        res.redirect('/details/' + movieId);
    }
}