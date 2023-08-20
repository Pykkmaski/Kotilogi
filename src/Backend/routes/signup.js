const router = require('express').Router();
require('dotenv').config();
const Signup = require('../Functions/Signup');

router.post('/', Signup);

module.exports = router;

