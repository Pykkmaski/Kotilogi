const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkAuth(req, res, next){

    try{    
        const token = req.headers.authorization.split(' ')[1]; //Format of token: Bearer TOKEN
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err){
                throw new Error(err);
            }
            else{
                req.user = user;
            }
        });

        
        next();
    }
    catch(err){
        res.status(403).send(err.message);
    }
    
}

module.exports = checkAuth;