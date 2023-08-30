const db = require('../../dbconfig');
const VerifyPassword = require('./VerifyPassword');
const CreateToken = require('./CreateToken');

require('dotenv').config();

module.exports = async (email, password) => {
    //Creates and returns the payload object as a string.
    return new Promise(async (resolve, reject) => {
        try{
            const savedUser = await db.select('email', 'active', 'password').from('users').where({email}).first();

            if(!savedUser) throw new Error(404);
    
            const passwordComparisonResult = await VerifyPassword(password, savedUser.password);
            if(!passwordComparisonResult) throw new Error(401);
            
            const token = CreateToken({email: savedUser.email, active: savedUser.active});
    
            const payload = {
                token: 'Bearer ' + token,
                email,
                active: savedUser.active,
            }
    
            return resolve(payload);
        }
        catch(err){
            return reject(err);
        }
        
    });
}