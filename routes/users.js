const RouteHandleError = require('../Functions/RouteHandleError');
const crypto = require('crypto');
const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const SendPasswordResetCode = require('../Functions/SendPasswordResetCode');
const SendActivationCode = require('../Functions/SendActivationCode');
const VerifyResetCode = require('../Functions/VerifyResetCode');

async function sendResetCode(req, res){
    
    return new Promise(async (resolve, reject) => {
        const {email} = req.body;
        if(!(await db('users').where({email}).first())) return reject(404); //A user with the provided email doesn't exist

        SendPasswordResetCode(email);
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

router.get('/', async (req, res) => {
    try{
        const {email} = req.body;
        const user = await db('users').where({email}).first();
        res.status(200).send(JSON.stringify(user));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/reset/password', async (req, res) => {
    const {step} = req.body;
    try{
        switch(step){
            case 0: 
                await sendResetCode(req, res);
            break;
    
            case 1:
                await VerifyResetCode(req, res);
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

        const comparisonResult = await bcrypt.compare(activationCode, savedActivationCode.activation_code);
        if(!comparisonResult) throw 403;
        
        const currentTime = new Date().getTime();
        if(currentTime > savedActivationCode.expires) throw 410;

        const user = (await db('users').where({email}).update({active: true}, ['email', 'active']))[0];
        res.status(200).send(JSON.stringify(user));
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
                return SendActivationCode(email, res);

            case 1:
                return SendPasswordResetCode(email, res);

            default: return res.sendStatus(500);
        }
    }
    catch(err){
        RouteHandleError(err, res);
    }
});


module.exports = router;