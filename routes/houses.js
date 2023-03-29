const router = require('express').Router();

router.get('/:username', async (req, res) => {
    try{
        const houses = await db('properties').where({username});
        if(!houses) throw new Error(`No houses yet for username ${username}`);
        res.status(200).send(JSON.stringify(houses));
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;