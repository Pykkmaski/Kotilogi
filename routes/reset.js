const router = require('express').Router();
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/RouteHandleError');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transport = nodemailer.createTransport({
    service: 'gmail',
    user: process.env.SERVICE_EMAIL_ADDRESS,
    pass: process.env.SERVICE_EMAIL_PASSWORD,
})

router.post('/password', async (req, res) => {
    try{
        
        const {email} = req.body;
        console.log('Received password reset request for email ' + email);
        const user = await db('users').where({email}).first();
        if(!user) throw 404;
        
        const resetCode = crypto.randomBytes(8).toString('hex');
        console.log(resetCode);
        res.sendStatus(200);
        
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;