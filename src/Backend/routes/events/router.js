const router = require('express').Router();
const checkAuth = require('../../middleware/checkAuth');
const convertDateToTime = require('../../middleware/convertDateToTime');
const checkPropertyAuth = require('../../middleware/checkPropertyAuth');
const deleteEventById = require('./deleteEventById');
const updateEventById = require('./updateEventById');
const getEventById = require('./getEventById');

router.get('/:event_id', checkAuth, getEventById);

router.put('/:event_id', checkAuth, checkPropertyAuth, convertDateToTime, updateEventById);

router.delete('/:event_id', checkAuth, deleteEventById);

module.exports = router;