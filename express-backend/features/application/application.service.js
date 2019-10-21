const db = require('_helpers/db');
const Issue = db.Issue;
const User = db.User;

module.exports = {
    getIssuesByUser,
    create,
    update,
    delete: _delete
};

async function getIssuesByUser(author) {
    return await Issue.find({ author: author });
}

async function create(responsible, url, severity, description, author) {
    const existingUser = await User.findById(author);
    if (!existingUser) throw 'User does not exist';

    const issue = new Issue({
        responsible: responsible,
        url: url,
        severity: severity,
        description: description,
        author: author
    });
    await issue.save();
}

async function update(id, params) {
    const issue = await Issue.findById(id);
    // validate
    if (!issue) throw 'Issue not found';

    Object.assign(issue,params);
    await issue.save();
}

async function _delete(id) {
    await Issue.findByIdAndRemove(id);
}
