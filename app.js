require('dotenv').config();

const express = require('express');
const config = require('config');
const cors = require('cors');
const recursive = require('recursive-readdir-sync');
const logger = require('morgan');
const auth = require('./helpers/auth');

const {handleError} = require('./helpers/errors');

const app = express();

// swagger documentation route
require('./helpers/swagger')(app);

// allow requests form anywhere
app.use(cors({origin: '*'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(auth);

// collect controllers recursively
recursive(`${__dirname}/routes`)
    .forEach(file => app.use('/', require(file)));

// global errors middleware
app.use((err, req, res, next) => handleError(err, res));

app.listen(config.app.port, () => {
    console.log(`${new Date()}: API started on port: ${config.app.port}`);
});
