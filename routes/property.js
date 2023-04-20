const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const db = require('../dbconfig');

router.get('/all', checkAuth, async (req, res) => {
    ///Returns all properties belonging implicitly to the client making the request.
    try{
        const {user} = req;
        const properties = await db('properties').where({owner: user.email});
        res.status(200).send(JSON.stringify(properties));

    }catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
});

router.get('/:property_id', checkAuth, async (req, res) => {
    ///Returns the property with the given ID.
    try{
        const {property_id} = req.params;
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw new Error(`Property with ID ${property_id} does not exist!`);
        res.status(200).send(JSON.stringify(property));
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/:property_id/events', checkAuth, async (req, res) => {
    ///Returns all events for given property.
    try{
        const {property_id} = req.params;
        const history = await db('property_events').where({property_id}).orderBy('date', 'asc');
        if(!history.length) throw 404;

        if(history[0].owner !== req.user.username) throw 403; //This will not work yet, as there is no owner field for property events entries.

        res.status(200).send(JSON.stringify(history));
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err);
            res.sendStatus(500);
        }
    }
});

router.get('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    ///Returns event with specified id.
    try{
        const {property_id, event_id} = req.params;
        const event = await db('property_events').where({property_id, id: event_id}).first();
        if(!event) throw 404;

        res.status(200).send(JSON.stringify(event));
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
})

router.put('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    ///Updates event with given id belonging to property with given id.
    try{
        const {property_id, event_id} = req.params;
        const data = req.body;
        await db('property_events').where({property_id, id: event_id}).update(data);
        res.sendStatus(200);
    }
    catch(err){
        if(typeof(err) !== 'number') {
            console.log(err.message);
            res.sendStatus(500);
            return;
        }

        res.sendStatus(err);
    }
});

router.post('/', checkAuth, async (req, res) => {
    ///Inserts new property data
    try{
        const data = req.body;
        await db('properties').insert(data);
        res.status(200).send();
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.post('/:property_id/events', checkAuth, async (req, res) => {
    ///Insert new event data for given property
    try{
        const {property_id} = req.params;
        const {name, description, date} = req.body;
        
        const property = await db('properties').where({property_id}).first();
        if(!property) throw 403;

        await db('property_events').insert({
            name, description, date, property_id
        });

        res.sendStatus(200);
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        } 
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
        
    }
});

router.delete('/:property_id', checkAuth, async (req, res) => {
    ///Deletes the property with given ID.
    try{
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    ///Deletes event with given id belonging to specified property.
    try{
        const {property_id, event_id} = req.params;
        await db('property_events').where({property_id, id : event_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        } 
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
});


module.exports = router;