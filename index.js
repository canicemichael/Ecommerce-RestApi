const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config();





require('./startup/logging')();

require('./startup/routes')(app);

require('./startup/db')();


app.listen(process.env.PORT, () => {
    console.log('Backend Server started');
})