const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkAuth(req, res, next){

    try{    
        const token = req.headers.auth;
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err){
                throw new Error(err);
            }
            else{
                req.authUser = user;
            }

            
        });

        
        next();
    }
    catch(err){
        res.status(403).send(err.message);
    }
    
}

module.exports = checkAuth;