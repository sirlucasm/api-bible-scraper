
const express = require('express');
const app = express();

const bibliaOnlineRoute = require('./bibliaonline');

app.use('/users', bibliaOnlineRoute);

module.exports = app;