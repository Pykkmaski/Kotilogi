const db = require("../dbconfig");

async function checkPropertyAuth(req, res, next){
    ///Use in property related requests to check wether the authorized user has permission to access the given property_id.
    try{
        const {property_id} = req.params;
        const {user} = req;
        if(!property_id){ next(); return}; //No property id defined. Will respond with full list of properties belonging to the authorized user.

        const userProperties = await db.select('id').from('properties').where({owner: user.email}).pluck('id');
        if(!userProperties.includes(parseInt(property_id))) throw new Error(`User ${user.email} is not permitted to access property ${property_id}!`);
        next();
    }
    catch(err){
        res.sendStatus(403);
    }
}

module.exports = checkPropertyAuth;