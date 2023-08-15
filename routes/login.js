const router = require('express').Router();
const RouteHandleError = require('../Functions/Util/RouteHandleError');
const CreateLoginPayload = require('../Functions/Util/CreateLoginPayload');

router.post('/', async (req, res) => {
    try{
        const {email, password} = req.body;
        const payload = await CreateLoginPayload(email, password);
        return res.status(200).send(payload);
    }
    catch(err){
        return RouteHandleError(err, res);
    }
});

module.exports = router;