const RouteHandleError = require('../../Functions/Util/RouteHandleError');

module.exports = async (req, res) => {
    ///Deletes the property with given ID.
    try{
        const {property_id} = req.params;
        const {password} = req.body;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}