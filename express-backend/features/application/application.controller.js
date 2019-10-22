const express = require('express');
const router = express.Router();
const applicationService = require('./application.service');
const jwt = require('jsonwebtoken');

/* Routes */
router.get('/', getApplications);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);
router.put('/note/:id', addNote);
router.put('/delete/note/:id', deleteNote);

module.exports = router;

function getApplications(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const authorId = jwt.decode(token, {complete: true}).payload.sub;

    applicationService.getApplications(authorId)
        .then(applications => res.json(applications))
        .catch(err => next(err));
}

function create(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const author = jwt.decode(token, {complete: true}).payload.sub;

    applicationService.create(
        req.body.appDate,
        req.body.jobTitle,
        req.body.company,
        req.body.location,
        req.body.email,
        req.body.telephone,
        author
    )
        .then(() => res.json({ message: 'New application recorded' }))
        .catch(err => next({ message: err.message}));
}

function update(req, res, next) {
    applicationService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Application updated' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    applicationService.delete(req.params.id)
        .then(() => res.json({ message: 'Application deleted'}))
        .catch(err => next(err));
}

function addNote(req, res, next) {
    applicationService.addNote(req.params.id, req.body.date, req.body.type, req.body.body)
        .then(() => res.json({ message: 'New Note added' }))
        .catch(err => next(err));
}

function deleteNote(req, res, next) {
    applicationService.deleteNote(req.params.id)
        .then(() =>res.json({ message: 'Note deleted' }))
        .catch(err => next(err));

}
