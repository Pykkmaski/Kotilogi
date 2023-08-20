const router = require('express').Router();
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/Util/RouteHandleError');

router.delete('/:username', checkAuth, async (req, res) => {
    try{
        const {username} = req.params;
        await db('users').where({username}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;