const RouteHandleError = require('../Functions/RouteHandleError');
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');

const router = require('express').Router();

router.get('/:property_id', checkAuth, async (req, res) => {
    try{
        const {property_id} = req.params;
        const data = await db('usage').where({property_id});
        if(!data) throw 404;
        res.status(200).send(JSON.stringify(data));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/', checkAuth, async (req, res) => {
    try{
        const {data} = req.body;
        data.time = new Date(data.time).getTime();
        await db('usage').insert(data);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/', checkAuth, async (req, res) => {
    try{
        const {entry_id} = req.body.entry_id;
        await db('usage').where({id: entry_id}).update(req.body.data);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/', checkAuth, async (req, res) => {
    try{
        const {entry_id} = req.body.entry_id;
        await db('usage').where({id: entry_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;