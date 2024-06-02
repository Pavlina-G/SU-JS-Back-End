module.exports = {
    createGet: (req, res) => {
        res.render('cast-create');
    },
    createPost: async (req, res) => {
        
        const result = await createCast(req.body);

        res.redirect('/');
    }
}