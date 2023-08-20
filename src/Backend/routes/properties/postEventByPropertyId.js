const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
    ///Insert new event data for given property
    try{
        const {property_id} = req.params;
        const {name, description, date} = req.body;
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw new Error(403);

        db('property_events').insert({name, description, date: new Date(date).getTime(), property_id}, ['id']).then(arr => {
            const data = arr[0];
            res.status(200).send(data.id.toString());
        })
        .catch(err => {throw err});
    }
    catch(err){
        RouteHandleError(err, res);
    }
}