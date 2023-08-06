const db = require('../../models/database');
const VerifyPassword = require('./VerifyPassword');
const CreateToken = require('./CreateToken');

require('dotenv').config();

module.exports = (email, password) => {
    //Creates and returns the payload object as a string.
    return new Promise(async (resolve, reject) => {
        const savedUser = await db.getUserByEmail(email);

        if(!savedUser) return reject(new Error(404));

        if(!VerifyPassword(password, savedUser.password)) return reject(new Error(401));
        const token = CreateToken(email);

        const payload = {
            token: 'Bearer ' + token,
            email,
            active: savedUser.active,
        }

        resolve(JSON.stringify(payload));
    });
}