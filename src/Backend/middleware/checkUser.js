const RouteHandleError = require("../Functions/RouteHandleError");

async function checkUser(req, res, next){
    try{
        const {email} = req.body;
        const savedUser = await db.select('password', 'email').from('users').where({email}).first();
        if(!savedUser) throw 404;
    }
    catch(err){
        RouteHandleError(err, res);
    }
}

module.exports = checkUser;