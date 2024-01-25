export function logError(err: unknown){
    if(err && typeof err === 'object' && 'message' in err){
        console.log(err.message);
    }
    else{
        console.log('Received an error in an unsupported format: ' + err);
    }
}