const db = require('../../dbconfig');
const CheckPassword = require('./VerifyPassword');
const CreateToken = require('./CreateToken');

require('dotenv').config();

module.exports = (email, password) => {

    //Creates and returns the payload object as a string.
    return new Promise(async (resolve, reject) => {
        const {email, password} = req.body;
        const savedUser = await db.select('password', 'email', 'active').from('users').where({email}).first();

        if(!savedUser) return reject(404);

        if(!CheckPassword(password, savedUser.password)) return reject(401);
        const token = CreateToken(email);

        const payload = {
            token: 'Bearer ' + token,
            email,
            active: savedUser.active,
        }

        resolve(JSON.stringify(payload));
    });
}