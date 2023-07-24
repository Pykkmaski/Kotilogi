const RouteHandleError = require("../Functions/RouteHandleError");
const db = require("../dbconfig");

async function checkEmail(req, res, next){
    try{
        const {email} = req.body;
        const user = await db('users').where({email}).first();
        if(!user) throw new Error('checkEmail middleware: No user exists with the email ' + email);
        next();
    }
    catch(err){
        RouteHandleError(err, res);
    }
}

module.exports = checkEmail;