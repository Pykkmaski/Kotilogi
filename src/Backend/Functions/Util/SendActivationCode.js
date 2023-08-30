const nodemailer = require('nodemailer');
const crypto = require('crypto');
const db = require('../../models/database');
const HashPassword = require('./HashPassword');

async function SendActivationCode(email){
    return new Promise(async (resolve, reject) => {
        const expiryTime = new Date().getTime() + parseInt(process.env.USER_ACTIVATION_CODE_EXPIRY_TIME);
        const activationCode = crypto.randomBytes(4).toString('hex');

        await db('user_activation_codes').insert({
            activation_code: HashPassword(activationCode, 15),
            user: email,
            expires: expiryTime,
        })
        .onConflict('user')
        .merge(['activation_code', 'expires']);

        const {transportOptions} = require('../../nodemailer.config');
        const transport = nodemailer.createTransport(transportOptions);

        transport.sendMail({
            from: `Kotilogi <${process.env.SERVICE_EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Aktivoi käyttäjätilisi Kotilogissa',
            html: `
                <h1>Tervetuloa Kotilogin käyttäjäksi!</h1>
                <span>Kirjaudu sisään ja syötä alla oleva koodi sille varattuun kenttään viikon kuluessa.</span><br/>
                <h2>${activationCode}</h2>
            `
        }, (err) => {
            if(err){
                return reject(new Error(400));
            }
            else{
                return resolve();
            }
        });
    });
}

module.exports = SendActivationCode;