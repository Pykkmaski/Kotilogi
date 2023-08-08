const db = require('../../dbconfig');
const HashPassword = require('./HashPassword');

async function ResetPassword(email, password1, password2){
    return new Promise(async (resolve, reject) => {
        if(password1 !== password2) return reject(new Error(409));
    
        const saltedPassword = HashPassword(password1, 15);
        db.updateUserByEmail(email)({
            password : saltedPassword
        })
        .catch(err => reject(err))
        .finally(() => resolve());
    });  
}

module.exports = ResetPassword;