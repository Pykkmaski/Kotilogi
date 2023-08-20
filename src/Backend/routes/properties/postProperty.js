const RouteHandleError = require('../../Functions/Util/RouteHandleError');
const db = require('../../dbconfig');

module.exports = async (req, res) => {
     ///Inserts new property data
     try{
        const data = req.body;
        data.owner = req.user.email;

        db('properties').insert(data, ['id']).then(arr => {
            const data = arr[0];
            res.status(200).send(data.id.toString());
        })
        .catch(err => {throw err});
    }
    catch(err){
        RouteHandleError(err, res);
    }
}