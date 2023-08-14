const router = require('express').Router();
const checkAuth = require('../../middleware/checkAuth');
const convertDateToTime = require('../../middleware/convertDateToTime');
const deleteEventById = require('./deleteEventById');
const updateEventById = require('./updateEventById');

router.get('/:event_id', checkAuth, getEventById);

router.put('/:event_id', checkAuth, convertDateToTime, updateEventById);

router.delete('/:event_id', checkAuth, deleteEventById);

module.exports = router;