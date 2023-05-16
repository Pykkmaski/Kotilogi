const bcrypt = require('bcrypt');
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/RouteHandleError');

async function checkPassword(req, res, next){
    try{
        const {user} = req.user;
        const {password} = req.body;
        const {savedPassword} = await db('users').where({email: user.email}).select('password').first();
        const result = await bcrypt.compare(password, savedPassword);
        if(!result) throw 403;
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}

module.exports = checkPassword;