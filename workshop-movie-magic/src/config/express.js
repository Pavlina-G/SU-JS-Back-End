const { urlencoded, static: expressStatic } = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

function configExpress(app) {
    app.use(cookieParser(process.env.SECRET));
    app.use(urlencoded({ extended: true }));
    app.use('/static', expressStatic('static'));
}

module.exports = { configExpress };