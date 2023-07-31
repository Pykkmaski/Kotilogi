const db = require('../dbconfig');
const bcrypt = require('bcrypt');

async function VerifyResetCode(req, res){
    return new Promise(async (resolve, reject) => {
        const {reset_code, email} = req.body;
        const data = await db('password_reset_codes').where({user: email}).first();
        if(!data) return reject (404); //No reset code exists for the provided email
        
        //Compare the provided code with the encrypted code stored in the database.
        const comparisonResult = await bcrypt.compare(reset_code, data.reset_code);
        if(!comparisonResult) return reject(403);

        const currentTime = new Date().getTime();
        if(currentTime > data.expires) return reject(410); //The code has expired.
    
        resolve();
    });
}

export default VerifyResetCode;