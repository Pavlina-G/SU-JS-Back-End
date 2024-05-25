const { urlencoded, static: expressStatic } = require('express');

function configExpress(app) {
    app.use(urlencoded({ extended: true }));
    app.use('static', expressStatic('static'));
}

module.exports = { configExpress };