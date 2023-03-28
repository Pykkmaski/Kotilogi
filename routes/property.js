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
        const property = await db('properties').where({address: id}).first();
        if(!property) throw new Error(`Property with ID ${id} does not exist!`);
        res.status(200).send(JSON.stringify(property));
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