const router = require('express').Router();
const RouteHandleError = require('../Functions/RouteHandleError');
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');
const upload = require('../middleware/fileUpload');
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

router.post('/', checkAuth, upload.single('image'), async (req, res) => {
    try{
        const {event_body, property_body} = req;
        if(property_body){
            await db('property_files').insert(property_body);
        }
        else if(event_body){
            await db('event_files').insert(event_body);
        }
        else{
            throw new Error('No property or event body present in image upload!');
        }
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/', checkAuth, async (req, res) => {
    try{
        const {event_body, property_body} = req;
        const {image_id} = req.body;

        if(property_body){
            await db('property_files').where({id: image_id}).update(property_body);
        }
        else if(event_body){
            await db('event_files').where({id: image_id}).update(event_body);
        }
        else{
            throw new Error('No property or event body present on image data update!');
        }
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/', checkAuth, async(req, res) => {
    try{
        const {image_id, target} = req.body;
        if(target === 'property'){
            await db('property_files').where({mime_type: 'image/jpeg', id: image_id}).del();
        }
        else if(target === 'event'){
            await db('event_files').where({mime_type: 'image/jpeg', id: image_id}).del();
        }
        else{
            throw new Error('Invalid target provided!' + `(${target})`);
        }
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;