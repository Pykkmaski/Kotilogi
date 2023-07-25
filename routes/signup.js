const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const RouteHandleError = require('../Functions/RouteHandleError');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

router.post('/', async (req, res) => {
    
    try{
        const {email, password1, password2, first_name, last_name} = req.body;

        const user = await db.select('username').from('users').where({email}).first();

        if(user) throw 406; //User already exists
        if(password1 !== password2) throw 409;

        const saltedPassword = await bcrypt.hash(password1, 15);
        await db('users').insert({
            email,
            password : saltedPassword,
            first_name,
            last_name,
            username: email,
        });

        const activationCode = crypto.randomBytes(8).toString('hex');
        await db('account_activation_codes').insert({
            activation_code: activationCode,
            user: email,
            expires: new Date().getTime() + process.env.USER_ACTIVATION_CODE_EXPIRY_TIME,
        })
        .onConflict('email')
        .merge(['activation_code', 'created_at']);
        const {transportOptions} = require('../nodemailer.config');
        const transport = nodemailer.createTransport(transportOptions);

        const info = await nodemailer.sendMail({
            from: `Kotilogi <${process.env.SERVICE_EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Aktivoi käyttäjätilisi kotilogissa',
            html: `
                <h1>Tervetuloa Kotilogin käyttäjäksi!</h1>
                <span>Klikkaa <a href=${activationLink}>tästä</a> aktivoidaksesi tilisi.</span>

            `
        });

        res.status(200).send('Signup success!');
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;

