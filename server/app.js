const express = require('express');
const cors = require('cors');
const routes = require('./controller');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', routes);

module.exports = app;
