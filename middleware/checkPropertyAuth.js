const db = require("../dbconfig");

async function checkPropertyAuth(req, res, next){
    ///Use in property related requests to check wether the authorized user has permission to access the given property_id.
    try{
        const {property_id} = req.params;
        const {user} = req;
        const userProperties = await db('properties').where({owner: user.email});
        
        const hasPermission = userProperties.map(item => {
            return item.id
        })
        .includes(property_id);

        if(!hasPermission) throw new Error(403);
        return next();
    }
    catch(err){
        return res.sendStatus(403);
    }
}

module.exports = checkPropertyAuth;