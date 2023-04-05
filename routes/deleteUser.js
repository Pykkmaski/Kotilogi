const router = require('express').Router();
const db = require('../dbconfig');

router.delete('/:username', checkAuth, async (req, res) => {
    try{
        const {username} = req.params;
        await db('users').where({username}).del();
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

module.exports = router;