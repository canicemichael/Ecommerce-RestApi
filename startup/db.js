const mongoose = require('mongoose');
const {logger} = require('../middleware/error');

module.exports = function(){
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> logger.info('DB connection successful'))
}