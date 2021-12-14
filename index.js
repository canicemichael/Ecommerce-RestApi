const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const config = require('config');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('DB connection successful'))
    .catch((err) => {
        console.log(err)
    })

app.listen(process.env.PORT, () => {
    console.log('Backend Server started');
})