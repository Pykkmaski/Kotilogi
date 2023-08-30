const CreateLoginPayload = require('../Functions/Util/CreateLoginPayload');
const RouteHandleError = require('../Functions/Util/RouteHandleError');

module.exports = async (req, res) => {
    try{
        const {email, password} = req.body;
        const payload = await CreateLoginPayload(email, password);
        return res.status(200).send(payload);
    }
    catch(err){
        return RouteHandleError(err, res);
    }
}