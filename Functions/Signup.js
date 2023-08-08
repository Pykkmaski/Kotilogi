const db = require('../models/database');
const SendActivationCode = require('./Util/SendActivationCode');
const RouteHandleError = require('./Util/RouteHandleError');
const HashPassword = require('./Util/HashPassword');

module.exports = async (req, res) => {
    try{
        const {email, password1, password2, first_name, last_name} = req.body;
        const user = await db.getUserByEmail(email);

        if(user)                    throw new Error(406); //User already exists
        if(password1 !== password2) throw new Error(409);

        await SendActivationCode(email);

        const saltedPassword = await HashPassword(password1, 15);

        await db('users').insert({
            email,
            password : saltedPassword,
            first_name,
            last_name,
            username: email,
        });

        return res.sendStatus(200);
    }
    catch(err){
        return RouteHandleError(err, res);
    }
}