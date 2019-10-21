/**
 * @type {errorHandler}
 *
 * Middleware global error handler. Removes need to error handling throughout application.
 * Configured as middleware in server.js.
 *
 * 400: Indicates a bad request sent to the server
 * 401: Unauthorized access token (JWT)
 * 500: It indicates there are some internal server issues (e.g. server is down)
 */
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        console.log('String error');
        return res.status(400).json({ message: err });
    }

    if (typeof (err) === 'object') {
        // custom application error
        console.log('Object error');
        return res.status(400).json({ message: err });
    }

    if(err.name === 'TypeError'){
        console.log('Type error');
        return res.status(401).json({ message: err.message });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        console.log('Mongoose error');
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        console.log('JWT auth error');
        return res.status(401).json({ message: 'Invalid Token' });
    }

    //default to 500 server error
    console.log('Default error');
    return res.status(500).json({ message: err.message });

}
