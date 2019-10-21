/**
 * Service provides core business logic for API
 **/
const bCrypt = require('bcryptjs');
const db = require('_helpers/db.js');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const User = db.User;

dotEnv.config();

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    //const isPasswordCorrect = bCrypt.compareSync(password, user.hash);

    /* If user and password matches user's hashed password */
    if(user && bCrypt.compareSync(password, user.hash)){
        /* User to Object less hashed password */
        const { hash, ...userWithoutHash } = user.toObject();
        /* Get token with user... jwt.sign(payload,secret-key, expires-in) */
        const token = jwt.sign(
            { sub: user.id, admin: user.admin },
            process.env.SECRET,
            { expiresIn:  '1d' }
            );
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (await User.findOne({ email: userParam.email })) {
        throw 'The email "' + userParam.email + '" is already registered';
    }


    const user = new User(userParam);
    // hashing password
    if (userParam.password) {
        user.hash = bCrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (userParam.password) {
        userParam.hash = bCrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
