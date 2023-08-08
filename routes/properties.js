const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const checkPropertyAuth = require('../middleware/checkPropertyAuth');
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/Util/RouteHandleError');

router.get('/', checkAuth, checkPropertyAuth, async (req, res) => {
    ///If request property_id is defined, responds with the property with the given id. Otherwise responds with all properties belonging to the authorized user making the request.
    try{
        const {user} = req;
        const {property_id} = req.body;
        const properties = !property_id ? await db('properties').where({owner: user.email}).orderBy('created_at', 'desc') : await db('properties').where({id: property_id});
        res.status(200).send(JSON.stringify(properties));

    }catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id', checkAuth, async (req, res) => {
    try{
        const {property_id} = req.params;
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw new Error(404);
        res.status(200).json(property);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events', checkAuth, checkPropertyAuth, async (req, res) => {
    try{
        const {property_id} = req.params;
        const history = await db('property_events').where({property_id}).orderBy('date', 'desc');
        if(!history.length) throw new Error(404);

        if(history[0].owner !== req.user.username) throw 403; //This will not work yet, as there is no owner field for property events entries.

        res.status(200).send(JSON.stringify(history));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id/events', checkAuth, async (req, res) => {
    ///Insert new event data for given property
    try{
        const {property_id} = req.params;
        const {name, description, date} = req.body;
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw new Error(403);

        db('property_events').insert({name, description, date: new Date(date).getTime(), property_id}, ['id']).then(arr => {
            const data = arr[0];
            res.status(200).send(data.id.toString());
        })
        .catch(err => {throw err});
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/', checkAuth, async (req, res) => {
    ///Inserts new property data
    try{
        const data = req.body;
        data.owner = req.user.email;

        db('properties').insert(data, ['id']).then(arr => {
            const data = arr[0];
            res.status(200).send(data.id.toString());
        })
        .catch(err => {throw err});
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/:property_id', checkAuth, checkPropertyAuth, async (req, res) => {
    ///Deletes the property with given ID.
    try{
        const {property_id} = req.params;
        const {password} = req.body;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/:property_id', checkAuth, checkPropertyAuth, async (req, res) => {
    try{
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).update(req.body);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
})


module.exports = router;