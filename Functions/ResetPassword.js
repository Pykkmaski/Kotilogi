const db = require('../dbconfig');
const bcrypt = require('bcrypt');

async function ResetPassword(email, password1, password2){
    return new Promise(async (resolve, reject) => {
        if(password1 !== password2) return reject(409);
    
        const saltedPassword = await bcrypt.hash(password1, 15)
        db('users').where({email}).update({
            password : saltedPassword
        })
        .catch(err => reject(err))
        .finally(() => resolve());
    });  
}

module.exports = ResetPassword;