const db                = require('kotilogi-app/dbconfig');
const VerifyPassword    = require('kotilogi-app/Functions/Util/VerifyPassword');
const CreateToken       = require('kotilogi-app/Functions/Util/CreateToken');

require('dotenv').config();

module.exports = async function (email, password){
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