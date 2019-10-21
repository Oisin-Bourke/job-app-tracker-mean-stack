const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false }
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
