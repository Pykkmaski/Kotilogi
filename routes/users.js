const RouteHandleError = require('../Functions/RouteHandleError');
const crypto = require('crypto');
const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');

async function sendResetCode(req, res){
    
    return new Promise(async (resolve, reject) => {
        const {email} = req.body;
        if(!(await db('users').where({email}).first())) return reject(404); //A user with the provided email doesn't exist

        const nodemailer = require('nodemailer');
        const {transportOptions} = require('../nodemailer.config');
        const transport = nodemailer.createTransport(transportOptions);

        const resetCode = crypto.randomBytes(8).toString('hex');
        const expiryTime = new Date().getTime() + parseInt(process.env.PASSWORD_RESET_CODE_EXPIRY_TIME);

        await db('password_reset_codes').insert({
            user: email,
            reset_code: resetCode,
            expires: expiryTime,
        })
        .onConflict('user')
        .merge(['reset_code', 'expires']);

        const passwordResetContent = `
            <span>Olet pyytänyt salasanasi nollausta. Jos et tehnyt tätä, voit jättää tämän viestin huomioimatta.</span></br>
            <span>Kopioi ja liitä alla oleva koodi sille varattuun kenttään 30min kuluessa.</span></br>
            <h1>${resetCode}</h1>
        `

        console.log(resetCode);

        const info  = await transport.sendMail({
            from: process.env.SERVICE_EMAIL_ADDRESS,
            to: email,
            subject: 'Salasanan nollaus',
            html: passwordResetContent,
        });

        resolve();
    });

    
    
}

async function verifyResetCode(req, res){
    return new Promise(async (resolve, reject) => {
        const {reset_code, email} = req.body;
        const data = await db('password_reset_codes').where({user: email}).first();
        if(!data) return reject (404); //No reset code exists for the provided email
        
        if(data.reset_code !== reset_code) return reject(403);

        const timeDifference = new Date().getTime() - data.created_at;
        const {passwordResetWindow} = require('../server.config');
        if(timeDifference > passwordResetWindow) return reject(410); //The code has expired.
    
        resolve();
    });
}

async function resetPassword(req, res){
    return new Promise(async (resolve, reject) => {
        const {email, password1, password2} = req.body;
        if(password1 !== password2) return reject(409);
    
        const saltedPassword = await bcrypt.hash(password1, 15)
        db('users').where({email}).update({
            password : saltedPassword
        })
        .catch(err => reject(err))
        .finally(() => resolve());
    });  
}

router.post('/reset/password', async (req, res) => {
    const {step} = req.body;
    try{
        switch(step){
            case 0: 
                await sendResetCode(req, res);
            break;
    
            case 1:
                await verifyResetCode(req, res);
            break;
    
            case 2:
                await resetPassword(req, res);
            break;
    
            default: throw 500;
        }
    
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}); 


module.exports = router;