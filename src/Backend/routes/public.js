const router = require('express').Router();
const RouteHandleError = require('../Functions/Util/RouteHandleError');
const db = require('../dbconfig');

router.get('/properties', async (req, res) => {
    try{
        const {page_num} = req.body;
        const properties = await db('properties').offset(page_num);
        res.status(200).send(properties);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});
