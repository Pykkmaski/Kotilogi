const router = require('express').Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const RouteHandleError = require('../Functions/Util/RouteHandleError');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const SendActivationCode = require('../Functions/Util/SendActivationCode');
require('dotenv').config();
const Signup = require('../Functions/Signup');

router.post('/', async (req, res) => {
    try{
        await Signup(req.body);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;

