const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    try{
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).update(req.body, '*');
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}