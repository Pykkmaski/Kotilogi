const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const RouteHandleError = require('../Functions/RouteHandleError');

router.post('/', async (req, res) => {
    
    try{
        const {email, password1, password2, first_name, last_name} = req.body;

        const user = await db.select('username').from('users').where({email}).first();

        if(user) throw 406; //User already exists
        if(password1 !== password2) throw 409;

        const saltedPassword = await bcrypt.hash(password1, 15);
        await db('users').insert({
            email,
            password : saltedPassword,
            first_name,
            last_name,
            username: email,
        });

        res.status(200).send('Signup success!');
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;

