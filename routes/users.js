const RouteHandleError = require('../Functions/RouteHandleError');
const crypto = require('crypto');
const router = require('express').Router();
const db = require('../dbconfig');

async function sendResetCode(req, res){
    const {email} = req.body;
    if(!(await db('users').where({email}).first())) throw 404;

    const nodemailer = require('nodemailer');
    const {transportOptions} = require('../nodemailer.config');
    const transport = nodemailer.createTransport(transportOptions);

    const resetCode = crypto.randomBytes(8).toString('hex');
    await db('password_reset_codes').insert({
        user: email,
        reset_code: resetCode,
    });

    const passwordResetContent = `
        <span>Olet pyytänyt salasanasi nollausta. Jos et tehnyt tätä, voit jättää tämän viestin huomioimatta.</span></br>
        <span>Kopioi ja liitä alla oleva koodi sille varattuun kenttään 30min kuluessa.</span></br>
        <h1>${resetCode}</h1>
    `
    const info  = await transport.sendMail({
        from: process.env.SERVICE_EMAIL_ADDRESS,
        to: email,
        subject: 'Salasanan nollaus',
        html: passwordResetContent,
    });

    res.sendStatus(200);
}

async function verifyResetCode(req, res){
    const {reset_code, email} = req.body;
    const data = await db('password_reset_codes').where({email}).first();
    if(!storedCode) throw 404;
    
    if(storedCode !== reset_code) throw 403;
    res.sendStatus(200);
}

router.post('/reset/password', async (req, res) => {
    try{
        const {step} = req.body;
        switch(step){
            case 0: 
                sendResetCode(req, res);
            break;

            case 1:
                verifyResetCode(req, res);
            break;
        }

    }
    catch(err){
        RouteHandleError(err, res);
    }
}); 


module.exports = router;