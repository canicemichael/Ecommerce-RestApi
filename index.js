const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const users = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/carts');
const orderRoute = require('./routes/orders');

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('DB connection successful'))
    .catch((err) => {
        console.log(err)
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/auth', authRoute);
app.use('/api/users', users);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(process.env.PORT, () => {
    console.log('Backend Server started');
})