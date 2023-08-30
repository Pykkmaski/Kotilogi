const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function CreateToken(data){
    return jwt.sign(data, process.env.TOKEN_SECRET);
}