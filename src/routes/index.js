
const express = require('express');
const app = express();

const bibliaApiRoute = require('./bibliaapi');

app.use('/bibliaapi', bibliaApiRoute);

module.exports = app;