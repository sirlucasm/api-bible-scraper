
const express = require('express');
const app = express();

const bibliaOnlineRoute = require('./bibliaonline');

app.use('/bibliaonline', bibliaOnlineRoute);

module.exports = app;