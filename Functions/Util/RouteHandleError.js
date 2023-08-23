function RouteHandleError(err, res){

    const errType = typeof(err);
    const internalServerErrorCode = 500;

    if(errType !== 'object'){
        console.log('RouteHandleError: Got error of unexpected type! ' + errType);
        return internalServerErrorCode;
    }

    if(!err.message){
        console.log('RouteHandleError: Received error does not have a message property!');
        return internalServerErrorCode;
    }

    const msg = err.message;
    if(msg.length == 3) return res.sendStatus(parseInt(msg)); //Assumes its a 3-digit number
    
    console.log(msg);
    return res.sendStatus(internalServerErrorCode);
}

module.exports = RouteHandleError;