const router = require('express').Router();
const Login = require('../Functions/Login');

router.post('/', Login);

module.exports = router;