const router = require('express').Router();
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/RouteHandleError');

router.post('/password', checkAuth, async (req, res) => {
    try{
        
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;