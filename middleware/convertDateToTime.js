async function convertDateToTime(req, res, next){
    try{
        req.body.date = new Date(req.body.date).getTime();
        next();
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = convertDateToTime;