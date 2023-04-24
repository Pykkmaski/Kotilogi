const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/RouteHandleError');
const db = require('../dbconfig');

router.get('/:event_id', checkAuth, async (req, res) => {
    ///Returns specific event for a property,
    try{
        const {event_id} = req.params;
        const event = await db('property_events').where({id: event_id}).first();
        if(!event) throw 404;
        res.status(200).send(JSON.stringify(event));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/property/:property_id', checkAuth, async (req, res) => {
    ///Returns all events for a property.
    try{
        const {property_id} = req.params;
        const events = await db('property_events').where({property_id});
        if(!events) throw 404;
        res.status(200).send(JSON.stringify(events));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/:event_id', checkAuth, async (req, res) => {
    try{
        const event = req.body;
        const {event_id} = req.params;
        await db('property_events').where({id: event_id}).update(event);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/', checkAuth, async (req, res) => {
    ///Posts a new event
    try{
        const data = req.body;
        const id = await db('property_events').insert(data, ['id']);
        res.status(200).send(id[0]);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/:event_id', checkAuth, async (req, res) => {
    try {
        const {event_id} = req.params;
        await db('property_events').where({id: event_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;