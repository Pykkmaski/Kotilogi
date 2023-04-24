function RouteHandleError(err, res){
    if(typeof(err) === 'number'){
        res.sendStatus(err);
    }
    else{
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = RouteHandleError;