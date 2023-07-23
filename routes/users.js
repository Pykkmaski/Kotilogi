const RouteHandleError = require('../Functions/RouteHandleError');
const crypto = require('crypto');
const router = require('express').Router();
const db = require('../dbconfig');

router.post('/reset/password', async (req, res) => {
    try{
        const {email} = req.body;
        if(!(await db('users').where({email}).first())) throw 404;

        const nodemailer = require('nodemailer');
        const {transportOptions} = require('../nodemailer.config');
        const transport = nodemailer.createTransport(transportOptions);

        const resetCode = crypto.randomBytes(8).toString('hex');
        console.log(resetCode);
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
    catch(err){
        RouteHandleError(err, res);
    }
}); 


module.exports = router;