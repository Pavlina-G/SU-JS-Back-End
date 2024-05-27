const {Router} = require('express');

const { notFound } = require('../controllers/404');
const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');

const router = Router();

// TORO adding routes

router.get('/', home);
router.get('/about', about);
router.get('/search', search);
router.get('/create', createGet);
router.post('/create', createPost);
router.get('/details/:id', details);

router.get('*', notFound)

module.exports = {router};