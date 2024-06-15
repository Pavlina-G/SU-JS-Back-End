require('dotenv').config();

const express = require('express');
const { configDatabase } = require('./config/database');
const { configHbs } = require('./config/hbs');
const { configExpress } = require('./config/express');
const { configRoutes } = require('./config/routes');

const PORT = process.env.PORT;


async function startApp(){
    const app = express();

    await configDatabase();
    configHbs(app);
    configExpress(app);
    configRoutes(app);

    app.listen(PORT, ()=> {
        console.log(`App running on port ${PORT}`);
    });
}

startApp();


