const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkAuth(req, res, next){

    try{    
        const authorization = req.headers.authorization;
        if(!authorization) throw new Error('No authorization token present!');
        
        const token = authorization.split(' ')[1]; //Format of token: Bearer TOKEN

        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch(err){
        res.status(403).send(err.message);
    }
    
}

module.exports = checkAuth;