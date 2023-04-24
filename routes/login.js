const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RouteHandleError = require('../Functions/RouteHandleError');
require('dotenv').config();

router.post('/', async (req, res) => {
    try{
        const {email, password} = req.body;
        const savedUser = await db.select('password', 'email').from('users').where({email}).first();

        if(!savedUser) throw 404;

        if(!(await bcrypt.compare(password, savedUser.password))) throw 401;

        const token = jwt.sign({ email: savedUser.email }, process.env.TOKEN_SECRET);
        const payload = {
            token: 'Bearer ' + token,
            email,
        }
        res.status(200).send(JSON.stringify(payload));
        
    }
    catch(err){
        RouteHandleError(err, res);
    }

});

module.exports = router;