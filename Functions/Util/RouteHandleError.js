function RouteHandleError(err, res){
    if(typeof(err.message) === 'number'){
        return res.sendStatus(err.message);
    }
    else{
        console.log(err.message);
        return res.sendStatus(500);
    }
}

module.exports = RouteHandleError;