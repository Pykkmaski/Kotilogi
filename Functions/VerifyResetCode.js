const db = require('../dbconfig');
const bcrypt = require('bcrypt');

async function VerifyResetCode(reset_code, email){
    ///Verifies a provided reset code matches the encrypted code stored in the database
    return new Promise(async (resolve, reject) => {
        const data = await db('password_reset_codes').where({user: email}).first();
        if(!data) return reject (404); //No reset code exists for the provided email
        
        //Reject unmatching codes
        const comparisonResult = await bcrypt.compare(reset_code, data.reset_code);
        if(!comparisonResult) return reject(403);

        const currentTime = new Date().getTime();
        if(currentTime > data.expires) return reject(410); //The code has expired.
    
        resolve();
    });
}

module.exports = VerifyResetCode;