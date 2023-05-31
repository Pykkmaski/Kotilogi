const router = require('express').Router();
const RouteHandleError = require('../Functions/RouteHandleError');
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');
const {uploadPath} = require('../uploadsConfig');

router.get('/', checkAuth, async (req, res) => {
    try{
        const {target, target_id, image_id} = req.query;
        var image;
        if(target === 'property'){
            
            image = image_id === 'main' ?
            await db('property_files').where({property_id: target_id, main: true}).first() :
            await db('property_files').where({property_id: target_id, id: image_id});

        }
        else if(target === 'event'){
            image = image_id === 'main' ?
            await db('event_files').where({event_id: target_id, main: true}).first() :
            await db('event_files').where({event_id: target_id, id: image_id});
        }

        if(!image) throw 404;

        res.status(200).sendFile(uploadPath + image.filename);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;