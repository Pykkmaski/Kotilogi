const router = require('express').Router();
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/RouteHandleError');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

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

router.post('/password', async (req, res) => {
    try{
        
        const {email} = req.body;
        console.log('Received password reset request for email ' + email);
        const user = await db('users').where({email}).first();
        if(!user) throw 404;
        
        const resetCode = crypto.randomBytes(8).toString('hex');
        transport.sendMail({
            from: {
                name: 'Kotilogi',
                user: process.env.SERVICE_EMAIL_ADDRESS,
            },

            to: [email],
            subject: 'Salasanan nollauskoodi',
            text: 'Olet pyytänyt salasanasi nollaamista. Jos et tehnyt tätä, jätä tämä viesti huomioimatta. Alla on salasanasi nollaamista varten varattu koodi. Syötä tämä sille varattuun kenttään puolen tunnin kuluessa.',
            html: `<h1>${resetCode}</h1>`,
        }, (err) => {
            if(err){
                console.log('Failed to send password reset code to ' + email, err);
            }
        });

        res.sendStatus(200);
        
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;