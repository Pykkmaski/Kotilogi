const db = require("../models/database");
const RouteHandleError = require("./Util/RouteHandleError");

exports.GetAllUserProperties = async (req, res) => {
    try{
        const {email} = req.params;
        const properties = await db.select('*').from('properties').where({owner: email});
        res.status(200).send(JSON.stringify(properties));
    }
    catch(err){
        RouteHandleError(err, res);
    }
}

exports.GetPropertyById = async (req, res) => {
    try{
        const {property_id} = req.params;
        const property = await db.select('*').from('properties').where({id: property_id}).first();
        if(!property) throw new Error(404);
        res.status(200).send(JSON.stringify(property));
    }
    catch(err){
        RouteHandleError(err, res);
    }
}