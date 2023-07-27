const RouteHandleError = require('../Functions/RouteHandleError');
const crypto = require('crypto');
const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const SendPasswordResetCode = require('../Functions/SendPasswordResetCode');
const SendActivationCode = require('../Functions/SendActivationCode');

async function sendResetCode(req, res){
    
    return new Promise(async (resolve, reject) => {
        const {email} = req.body;
        if(!(await db('users').where({email}).first())) return reject(404); //A user with the provided email doesn't exist

        SendPasswordResetCode(email);
        resolve();
    });
}

async function verifyResetCode(req, res){
    return new Promise(async (resolve, reject) => {
        const {reset_code, email} = req.body;
        const data = await db('password_reset_codes').where({user: email}).first();
        if(!data) return reject (404); //No reset code exists for the provided email
        
        if(data.reset_code !== reset_code) return reject(403);

        const currentTime = new Date().getTime();
        if(currentTime > data.expires) return reject(410); //The code has expired.
    
        resolve();
    });
}

async function resetPassword(req, res){
    return new Promise(async (resolve, reject) => {
        const {email, password1, password2} = req.body;
        if(password1 !== password2) return reject(409);
    
        const saltedPassword = await bcrypt.hash(password1, 15)
        db('users').where({email}).update({
            password : saltedPassword
        })
        .catch(err => reject(err))
        .finally(() => resolve());
    });  
}

router.post('/reset/password', async (req, res) => {
    const {step} = req.body;
    try{
        switch(step){
            case 0: 
                await sendResetCode(req, res);
            break;
    
            case 1:
                await verifyResetCode(req, res);
            break;
    
            case 2:
                await resetPassword(req, res);
            break;
    
            default: throw 500;
        }
    
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}); 

router.post('/activate', async (req, res) => {
    try{
        const {activationCode, email} = req.body;

        const savedActivationCode = await db('user_activation_codes').where({user: email}).first();
        if(!savedActivationCode) throw 404;

        if(savedActivationCode.activation_code !== activationCode) throw 409;
        
        const currentTime = new Date().getTime();
        if(currentTime > savedActivationCode.expires) throw 410;

        await db('users').where({email}).update({active: true});
        res.status(200).send('Käyttäjätilisi on aktivoitu!');
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/resend', async (req, res) => {
    try{
        const {instruction, email} = req.body;
        switch(instruction){
            case 0:
                SendActivationCode(email);
            break;

            case 1:
                SendPasswordResetCode(email);
            break;

            default: return res.sendStatus(500);
        }

        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});


module.exports = router;