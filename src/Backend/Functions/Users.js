const db = require("../dbconfig");
const RouteHandleError = require("./Util/RouteHandleError");

exports.GetUser = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await db.select('*').from('users').where({email}).first();
        if(!user) throw new Error(404);
        return res.status(200).send(JSON.stringify(user));
    }
    catch(err){
        RouteHandleError(err, res);
    }
}

