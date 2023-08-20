const RouteHandleError = require("../../Functions/Util/RouteHandleError")
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    try{
        const {event_id} = req.params;
        await db('property_events').where({id: event_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res); 
    }
}