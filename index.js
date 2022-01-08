const express = require('express');

const app = express();

require('./startup/dotenv')();
require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);

require('./startup/db')();


app.listen(process.env.PORT, () => {
    console.log('Backend Server started');
})