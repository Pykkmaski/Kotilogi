module.exports = async (req, res) => {
    //Responds with the property with the requested id, if it exists.
    try{
        const {property_id} = req.params;
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw new Error(404);
        res.status(200).json(property);
    }
    catch(err){
        RouteHandleError(err, res);
    }
}