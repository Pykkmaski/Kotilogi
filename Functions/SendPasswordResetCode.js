const nodemailer = require('nodemailer');

async function SendPasswordResetCode(email){
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

        console.log(resetCode);

        const info  = await transport.sendMail({
            from: process.env.SERVICE_EMAIL_ADDRESS,
            to: email,
            subject: 'Salasanan nollaus',
            html: passwordResetContent,
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = SendPasswordResetCode;