const router = require('express').Router();
const CreateLoginPayload = require('../Functions/CreateLoginPayload');
const Login = require('../Functions/Login');
const RouteHandleError = require('../Functions/Util/RouteHandleError');

router.post('/', async (req, res) => {
    try{
        const {email, password} = req.body;
        const payload = await CreateLoginPayload(email, password);
        res.status(200).send(payload);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;