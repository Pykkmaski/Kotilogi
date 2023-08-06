const router = require('express').Router();
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/Util/RouteHandleError');
const convertDateToTime = require('../middleware/convertDateToTime');

router.get('/:event_id', checkAuth, async (req, res) => {
    ///Returns event with specified id.
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

router.put('/:event_id', checkAuth, convertDateToTime, async (req, res) => {
    ///Updates event with given id belonging to property with given id.
    try{
        const {event_id} = req.params;
        const data = req.body;
        await db('property_events').where({id: event_id}).update(data);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/:event_id', checkAuth, async (req, res) => {
    ///Deletes event with given id belonging to specified property.
    try{
        const {event_id} = req.params;
        await db('property_events').where({id : event_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;