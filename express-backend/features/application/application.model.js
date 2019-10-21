const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    appDate: { type: Date, required: true },
    jobTitle: { type: String, trim: true, required: true },
    company: { type: String, trim: true, required: true },
    location: { type: String, trim: true, required: true },
    email: { type: String, trim: true },
    telephone: { type: String, trim: true },
    status: { type: String, default: 'Open' },
    notes : [
        { date: Date, body: String }
        ],
    updates: { type: Boolean },
    createdDate: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
});

applicationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Application', applicationSchema);
