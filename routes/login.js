const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
    try{
        const {username, password} = req.body;
        const savedUser = await db.select('password', 'first_name', 'last_name').from('users').where({username}).first();

        if(!savedUser) throw new Error(`Invalid Username`);

        if(!(await bcrypt.compare(password, savedUser.password))) throw new Error('Invalid Password');
        const token = jwt.sign(savedUser, process.env.TOKEN_SECRET);
        const payload = {
            token,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            username,
        }
        res.status(200).send(JSON.stringify(payload));
        
    }
    catch(err){
        res.status(500).send(err.message);
    }

});

module.exports = router;