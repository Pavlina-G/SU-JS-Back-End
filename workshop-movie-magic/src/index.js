require('dotenv').config();

const express = require('express');
const { configDatabase } = require('./config/database');
const { configHbs } = require('./config/hbs');
const { configExpress } = require('./config/express');
const { router } = require('./config/routes');

const PORT = process.env.PORT;


async function startApp(){
    const app = express();

    await configDatabase();
    configHbs(app);
    configExpress(app);
    app.use(router)
    
    app.listen(PORT, ()=> {
        console.log(`App running on port ${PORT}`);
    });
}

startApp();


