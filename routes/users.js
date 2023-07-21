const RouteHandleError = require('../Functions/RouteHandleError');
const crypto = require('crypto');
const router = require('express').Router();

router.post('/reset/password', async (req, res) => {
    try{
        const {email} = req.body;
        if(!(await db('users').where({email}).first())) throw 404;

        const nodemailer = require('nodemailer');
        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SERVICE_EMAIL_ADDRESS,
                pass: process.env.SERVICE_EMAIL_PASSWORD,
            },
            tls : { rejectUnauthorized: false }
        });

        const resetCode = crypto.randomBytes(8).toString('hex');

        transport.sendMail({
            from: {
                user: process.env.SERVICE_EMAIL_ADDRESS,
            },
            to: email,

            subject: 'Salasanan Nollauskoodi',
            text: 'Olet pyytänyt tilisi salasanan nollausta. Jos et tehnyt tätä, jätä tämä viesti huomioimatta. Syötä alla oleva koodi sille varattuun kenttään 30min kuluessa.',
            html: `<h1>${resetCode}</h1>`,
            
        }, (err) => {
            if(err){
                console.log('Sending of password reset code to ' + email + ' failed!', err);
                res.sendStatus(500);
            }
        })

    }
    catch(err){
        RouteHandleError(err, res);
    }
}); 


module.exports = router;