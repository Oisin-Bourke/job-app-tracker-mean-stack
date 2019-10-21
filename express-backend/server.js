/**
 * REST-ful Api program interface
 *
 * Starts express app web server.
 * Configure middle-wares.
 * Bind controllers to routes.
 **/

/* Make all url paths relative to root directory */
require('rootpath')();
const express = require('express');
express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

/* Middle-wares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use('/users', require('./features/users/user.controller'));
app.use('/applications', require('./features/application/application.controller'));

app.use(errorHandler);

/* Start server */
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80 ) : 4000;
app.listen(port, function () {
    console.log('Server listening on port: ' + port);
});






