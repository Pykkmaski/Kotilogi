const db = require('../dbconfig');
const SendActivationCode = require('./Util/SendActivationCode');
const HashPassword = require('./Util/HashPassword');

module.exports = async (data) => {
    
    return new Promise(async (resolve, reject) => {
        const {email, password1, password2, first_name, last_name} = data;
        const user = await db.select('username').from('users').where({email}).first();

        if(user)                    return reject(new Error(406)); //User already exists
        if(password1 !== password2) return reject(new Error(409));

        await SendActivationCode(email);

        const saltedPassword = HashPassword(password1, 15);

        await db('users').insert({
            email,
            password : saltedPassword,
            first_name,
            last_name,
            username: email,
        });

       resolve();
    });
}