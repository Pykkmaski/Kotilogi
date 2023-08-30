const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const VerifyPassword = require('../../Functions/Util/VerifyPassword');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    ///Deletes the property with given ID.
    try{
        const {password} = req.body;
        const savedPassword = await db.select('password').from('users').where({email: req.user.email}).first();
        const comparisonResult = await VerifyPassword(password, savedPassword.password);
        if(!comparisonResult) throw new Error(403);
        
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}