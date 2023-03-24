const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    
    try{
        const {username, password1, password2, first_name, last_name} = req.body;

        const user = await db.select('username').from('users').where({username}).first();
        if(user) throw new Error('Invalid Username');
        if(password1 !== password2) throw new Error('Invalid Password');

        const saltedPassword = await bcrypt.hash(password1, 15);
        await db('users').insert({
            username,
            password : saltedPassword,
            first_name,
            last_name,
        });

        res.status(200).send('Signup success!');
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;

