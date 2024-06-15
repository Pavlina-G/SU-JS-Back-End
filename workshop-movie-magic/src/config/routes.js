const { Router } = require('express');

const { isGuest, isUser } = require('../middlewares/guards');

const { notFound } = require('../controllers/404');
const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { movieRouter } = require('../controllers/movie');
const { createGet: createCastGet, createPost: createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { registerGet, registerPost, loginGet, loginPost, logout } = require('../controllers/user');

const router = Router();

function configRoutes(app) {
    app.get('/', home);
    app.get('/search', search);
    app.get('/details/:id', details);

    app.get('/attach/:id', isUser(), attachGet);
    app.post('/attach/:id', isUser(), attachPost);
    app.use(movieRouter);
}



//Move to movieRouter
// router.get('/create/movie', isUser(), createGet);
// router.post('/create/movie', isUser(), createPost);
// router.get('/edit/movie/:id', isUser(), editGet);
// router.post('/edit/movie/:id', isUser(), editPost);
// router.get('/delete/movie/:id', isUser(), deleteGet);
// router.post('/delete/movie/:id', isUser(), deletePost);


router.get('/create/cast', isUser(), createCastGet);
router.post('/create/cast', isUser(), createCastPost);

//Move to userRouter
router.get('/register', isGuest(), registerGet);
router.post('/register', isGuest(), registerPost);
router.get('/login', isGuest(), loginGet);
router.post('/login', isGuest(), loginPost);
router.get('/logout', logout);

router.get('/about', about);
router.get('*', notFound)

module.exports = { router, configRoutes };