const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try{
        const token = req.headers.auth;
        jwt.verify(token, TOKEN_SECRET, (err, username) => {
            if(err) res.sendStatus(403);
            res.sendStatus(200);
        });
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
});