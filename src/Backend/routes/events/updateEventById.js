const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    ///Updates event with given id belonging to property with given id.
    try{
        const {event_id} = req.params;
        const data = req.body;
        await db('property_events').where({id: event_id}).update(data);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}