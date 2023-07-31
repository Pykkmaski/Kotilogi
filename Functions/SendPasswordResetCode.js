const nodemailer = require('nodemailer');
const crypto = require('crypto');
const db = require('../dbconfig');
const RouteHandleError = require('./RouteHandleError');

async function SendPasswordResetCode(email, res){
    try{
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
        transport.sendMail({
            from: process.env.SERVICE_EMAIL_ADDRESS,
            to: email,
            subject: 'Salasanan nollaus',
            html: passwordResetContent,
        }, (err) => {
            if(err){
                res.sendStatus(500);
            }
            else{
                res.sendStatus(200);
            }
        });
    }
    catch(err){
        RouteHandleError(err, res);
    }
}

module.exports = SendPasswordResetCode;