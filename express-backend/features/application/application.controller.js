const express = require('express');
const router = express.Router();
const issueService = require('./application.service');
const jwt = require('jsonwebtoken');

/* Routes */
router.get('/', getIssuesByUser);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function getIssuesByUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const authorId = jwt.decode(token, {complete: true}).payload.sub;

    issueService.getIssuesByUser(authorId)
        .then(issues => res.json(issues))
        .catch(err => next(err));
}

function create(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const authorId = jwt.decode(token, {complete: true}).payload.sub;

    issueService.create(req.body.responsible, req.body.url, req.body.severity, req.body.description, authorId)
        .then(() => res.json({ message: 'New issue created' }))
        .catch(err => next({ message: err.message}));
}

function update(req, res, next) {
    issueService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Issue updated' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    issueService.delete(req.params.id)
        .then(() => res.json({ message: 'Issue deleted'}))
        .catch(err => next(err));
}
