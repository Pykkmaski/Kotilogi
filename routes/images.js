const RouteHandleError = require('../Functions/RouteHandleError');
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');
const router = require('express').Router();
const imageMimeType = 'image/jpeg';
const {uploadRoute} = require('../uploadsConfig');

router.get('/', checkAuth, async (req, res) => {
    try{    
        const {target, target_id, image_id} = req.query;

        if(target === 'property'){
            var query = {
                property_id : target_id,
                mimeType: imageMimeType,
            }

            if(image_id === 'main'){
                query.main = true;
            }
            else{
                query.id = image_id
            }

            const image = await db('property_files').where(query).first();
            if(!image) throw 404;
            res.status(200).sendFile(uploadRoute + image.filename);
        }
        else if(target === 'event'){
            var query = {
                event_id: target_id,
                mimeType: imageMimeType,
            }

            if(image_id === 'main'){
                query.main = true;
            }
            else{
                query.id = image_id;
            }

            const image = await db('event_files').where(query).first();
            if(!image) throw 404;
            res.status(200).sendFile(uploadRoute + image.filename);
        }
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;