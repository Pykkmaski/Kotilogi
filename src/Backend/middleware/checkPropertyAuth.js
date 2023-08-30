const db = require("../dbconfig");

async function checkPropertyAuth(req, res, next){
   ///Checks if an authorized user is permitted to make changes to a property.
    try{
        const {property_id} = req.params;
        const {user} = req;

        const userProperties = await db('properties').where({owner: user.email});
        const hasPermission = userProperties.map(item => item.id.toString()).includes(property_id);

        if(!hasPermission) throw new Error(403);
        return next();
    }
    catch(err){
        return res.sendStatus(403);
    }
}

module.exports = checkPropertyAuth;