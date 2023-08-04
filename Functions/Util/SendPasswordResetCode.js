const nodemailer = require('nodemailer');
const crypto = require('crypto');
const db = require('../dbconfig');
const RouteHandleError = require('./RouteHandleError');
const bcrypt = require('bcrypt');

async function SendPasswordResetCode(email){
    return new Promise(async (resolve, reject) => {
        if(!(await db('users').where({email}).first())) return reject(new Error(404)); //A user with the provided email doesn't exist

        const nodemailer = require('nodemailer');
        const {transportOptions} = require('../nodemailer.config');
        const transport = nodemailer.createTransport(transportOptions);

        const resetCode = crypto.randomBytes(8).toString('hex');
        const expiryTime = new Date().getTime() + parseInt(process.env.PASSWORD_RESET_CODE_EXPIRY_TIME);

        await db('password_reset_codes').insert({
            user: email,
            reset_code: await bcrypt.hash(resetCode, 15),
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
                return reject(new Error(400));
            }
            else{
                resolve();
            }
        });
    });
}

module.exports = SendPasswordResetCode;