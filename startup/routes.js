const express = require('express');
const cors = require('cors');

const users = require('../routes/users');
const authRoute = require('../routes/auth');
const productRoute = require('../routes/products');
const cartRoute = require('../routes/carts');
const orderRoute = require('../routes/orders');
const stripeRoute = require('../routes/stripe');
const { error, logger } = require('./middleware/error');

module.exports = function(app){
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use('/api/auth', authRoute);
    app.use('/api/users', users);
    app.use('/api/products', productRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/orders', orderRoute);
    app.use('/api/stripes', stripeRoute);

    app.use(error);
}