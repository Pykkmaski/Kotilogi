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
        
        const passwordResetContent = `
            <span>Olet pyytänyt salasanasi nollausta. Jos et tehnyt tätä, voit jättää tämän viestin huomioimatta.</span></br>
            <span>Kopioi ja liitä alla oleva koodi sille varattuun kenttään 30min kuluessa.</span></br>
            <h1>${resetCode}</h1>
        `

        console.log(resetCode);

        /*
        const info  = await transport.sendMail({
            from: process.env.SERVICE_EMAIL_ADDRESS,
            to: email,
            subject: 'Salasanan nollaus',
            html: passwordResetContent,
        });
        */

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
    try{
        const {email, password1, password2} = req.body;
        if(password1 !== password2) throw 409;
    
        const saltedPassword = await bcrypt.hash(password1, 15)
        await db('users').where({email}).update({
            password : saltedPassword
        });
    }
    catch(err){
        RouteHandleError(err, res);
    }
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
                resetPassword(req, res);
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