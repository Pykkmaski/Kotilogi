const router = require('express').Router();
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');

router.get('/repairHistory/:id', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const history = await db('repair_history').where({property_id: id});
        if(!history) throw new Error(`No repair history available for property with ID ${id}!`);
        req.status(200).send(JSON.stringify(history));
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/energy/:id', checkAuth, async (req, res) => {
    res.status(404).send('Under construction');
});

router.get('/owners/:id', checkAuth, async (req, res) => {
    res.status(404).send('Under construction');
})

module.exports = router;