/**
 * JSON Web Token middleware checks if token received from http request is valid
 * before allowing access to protected routes API (returns "401 Unauthorized" if not valid).
 */
const expressJwt = require('express-jwt');
const dotEnv = require('dotenv');
const userService = require('../features/users/user.service');

dotEnv.config();

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    /* payload.sub = payload subject (ObjectId) */
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
