const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    ///Deletes the property with given ID.
    try{
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}