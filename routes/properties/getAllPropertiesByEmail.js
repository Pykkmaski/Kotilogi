const RouteHandleError = require('../../Functions/Util/RouteHandleError');
module.exports = async (req, res) => {
     //Responds with all properties owned by the provided email.
     try{
        const {email} = req.params;
        const properties = await db('properties').where({owner: email});
        if(!properties) throw new Error(404);
        res.status(200).json(properties);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}