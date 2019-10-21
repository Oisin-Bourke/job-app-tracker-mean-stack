const mongoose = require('mongoose');
const dotEnv = require('dotenv');

dotEnv.config();

mongoose.connect(process.env.MONGODB_ATLAS ,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
    .then(() => console.log('Connected to Atlas MongoDB.'))
    .catch(() => console.log('Error. Connection to Atlas MongoDB failed.'));

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../features/users/user.model'),
    Issue: require('../features/application/application.model')
};
