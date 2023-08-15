const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    //Responds with all events associated with the requested property id.
    try{
        const {property_id} = req.params;
        const history = await db('property_events').where({property_id}).orderBy('date', 'desc');
        if(!history.length) throw new Error(404);

        //if(history[0].owner !== req.user.username) throw 403; //This will not work yet, as there is no owner field for property events entries.

        res.status(200).json(history);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}