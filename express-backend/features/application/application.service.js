const db = require('_helpers/db');
const Application = db.Application;
const User = db.User;

module.exports = {
    getApplications,
    getApplication,
    create,
    update,
    delete: _delete,
    addNote,
    deleteNote
};

async function getApplications(author) {
    return await Application.find({ author: author });
}

async function getApplication(id){
    return await Application.findById(id);
}

async function create(appDate, jobTitle, company, location, email, telephone, author) {
    const existingUser = await User.findById(author);
    if (!existingUser) throw 'User does not exist';

    const application = new Application({
        appDate: appDate,
        jobTitle: jobTitle,
        company: company,
        location: location,
        email: email,
        telephone: telephone,
        author: author
    });
    await application.save();
}

async function update(id, params) {
    const application = await Application.findById(id);
    // validate
    if (!application) throw 'Application not found';

    Object.assign(application,params);
    await application.save();
}

async function _delete(id) {
    await Application.findByIdAndRemove(id);
}

async function addNote(id, date, type, body) {
    const application = await Application.findById(id);
    if (!application) throw 'Application not found';

    const note = {
        date: date,
        type: type,
        body: body
    };

    application.notes.push(note);
    await application.save();
}

async function deleteNote(id) {
    await Application.updateOne({},{ $pull: { notes: { _id: id } } });
}
