const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    ///Returns event with specified id.
    try{
        const {event_id} = req.params;
        const event = await db('property_events').where({id: event_id}).first();
        if(!event) throw new Error(404);

        res.status(200).send(JSON.stringify(event));
    }
    catch(err){
        RouteHandleError(err, res);
    }
}