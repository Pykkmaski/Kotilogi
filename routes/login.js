const router = require('express').Router();
const Login = require('../Functions/Login');
const path = require('path');

router.post('/', Login);

module.exports = router;