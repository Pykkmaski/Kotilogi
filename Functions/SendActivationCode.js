const nodemailer = require('nodemailer');
const crypto = require('crypto');
const db = require('../dbconfig');
async function SendActivationCode(email){
    try{    
        const expiryTime = new Date().getTime() + parseInt(process.env.USER_ACTIVATION_CODE_EXPIRY_TIME);
        const activationCode = crypto.createHash('SHA256').update(expiryTime + email + new Date().getTime()).digest().toString('hex');

        await db('user_activation_codes').insert({
            activation_code: activationCode,
            user: email,
            expires: expiryTime,
        })
        .onConflict('user')
        .merge(['activation_code', 'expires']);

        const {transportOptions} = require('../nodemailer.config');
        const transport = nodemailer.createTransport(transportOptions);

        const info = await transport.sendMail({
            from: `Kotilogi <${process.env.SERVICE_EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Aktivoi käyttäjätilisi Kotilogissa',
            html: `
                <h1>Tervetuloa Kotilogin käyttäjäksi!</h1>
                <span>Kirjaudu sisään ja syötä alla oleva koodi sille varattuun kenttään viikon kuluessa.</span><br/>
                <h2>${activationCode}</h2>
            `
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = SendActivationCode;