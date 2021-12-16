const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const config = require('config');
const dotenv = require('dotenv');

dotenv.config();

const users = require('./routes/users');

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('DB connection successful'))
    .catch((err) => {
        console.log(err)
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use('/api/users', users);

app.listen(process.env.PORT, () => {
    console.log('Backend Server started');
})