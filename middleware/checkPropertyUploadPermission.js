async function checkPropertyUploadPermission(req, res, next){
    try{
        const user = req.user;
        const membershipLevel = await db('users').where({username: user.username}).select('membership_level');
        const numProperties = await db('properties').count({owner: user.username});

        switch(membership){
            default:
        }
        
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = checkMembership;