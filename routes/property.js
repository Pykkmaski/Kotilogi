const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const db = require('../dbconfig');

router.get('/all/:username', checkAuth, async (req, res) => {
    try{
        const username = req.params.username;
        const properties = await db('properties').where({owner: username});
        res.status(200).send(JSON.stringify(properties));
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/:id', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const property = await db('properties').where({id}).first();
        if(!property) throw new Error(`Property with ID ${id} does not exist!`);
        res.status(200).send(JSON.stringify(property));
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/:id/repairHistory', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const history = await db('property_events').where({property_id: id}).orderBy('created_at', 'asc');
        if(history === null) throw new Error({code: 404, message: `No repair history available for property with ID ${id}`});
        if(history[0].owner !== req.authUser.username) throw new Error({code: 403, message: 'access forbidden'}); //This will not work yet, as there is no owner field for property events entries.
        res.status(200).send(JSON.stringify(history));
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/:id/energy', checkAuth, async (req, res) => {
    try{
        throw new Error('Under construction');
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.post('/', checkAuth, async (req, res) => {
    try{
        const data = req.body;
        await db('properties').insert(data);
        res.status(200).send();
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;