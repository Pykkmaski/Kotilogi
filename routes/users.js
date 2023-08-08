const RouteHandleError = require('../Functions/Util/RouteHandleError');
const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const SendPasswordResetCode = require('../Functions/Util/SendPasswordResetCode');
const SendActivationCode = require('../Functions/Util/SendActivationCode');
const VerifyResetCode = require('../Functions/Util/VerifyResetCode');
const {GetUser} = require('../Functions/Users');

router.get('/', GetUser);

router.post('/reset/password', async (req, res) => {
    const {step} = req.body;
    try{
        switch(step){
            case 0: {
                const {email} = req.body;
                await SendPasswordResetCode(email);
            }
            break;
    
            case 1:{
                const {reset_code, email} = req.body;
                await VerifyResetCode(reset_code, email);
            }
                
            break;
    
            case 2:
                const {email, password1, password2} = req.body;
                await ResetPassword(email, password1, password2);
            break;
    
            default: throw new Error(500);
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
        if(!savedActivationCode) throw new Error(404);

        const comparisonResult = await bcrypt.compare(activationCode, savedActivationCode.activation_code);
        if(!comparisonResult) throw new Error(403);
        
        const currentTime = new Date().getTime();
        if(currentTime > savedActivationCode.expires) throw new Error(410);

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

            default: throw new Error(500);
        }
    }
    catch(err){
        RouteHandleError(err, res);
    }
});


module.exports = router;