const nodemailer = require('nodemailer');
const router = require('express').Router();

router.post('/api/contact', async (req, res) => {
    try{
        const {email, name, message} = req.body;
        const {transportOptions} = require('./nodemailer.config.js');
        const transport = nodemailer.createTransport(transportOptions);
        transport.sendMail({
            from: `${name} <${email}>`,
            to: process.env.SERVICE_CONTACT_EMAIL_ADDRESS,
            subject: 'Kotilogi yhteydenotto',
            text: message,
        }, (err => {
            if(err){
                throw err;
            }
            else{
                res.sendStatus(200);
            }
        }));
    }
    catch(err){
        const RouteHandleError = require('./Functions/RouteHandleError.js');
        RouteHandleError(err, res);
    }
});

module.exports = router;
