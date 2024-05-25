require('dotenv').config();

const express = require('express');
const { configHbs } = require('./config/hbs');
const { configExpress } = require('./config/express');
const { router } = require('./config/routes');

const PORT = process.env.PORT;

const app = express();

configHbs(app);
configExpress(app);
app.use(router)

app.listen(PORT);

