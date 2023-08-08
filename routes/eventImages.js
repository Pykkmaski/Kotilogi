const router = require('express').Router();
const db = require('../dbconfig');
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/Util/RouteHandleError');
const upload = require('../middleware/fileUpload');
const path = require('path');
const imageMimeType = 'image/jpeg';
const fs = require('fs');
const DeleteFile = require('../Functions/DeleteFile');
const {uploadPath} = require('../uploadsConfig');

router.get('/:event_id', checkAuth, async (req, res) => {
    ///Returns all image data for the specified event
    try{
        const {event_id} = req.params;
        const ids = await db('event_files').where({event_id, mime_type: imageMimeType});
        if(!ids) throw new Error(404);
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/image/:image_id', async (req, res) => {
    ///Returns the specified image
    try{
        const {image_id} = req.params;

        const file = await db('event_files').where({id: image_id}).first();
        if(!file) throw new Error(404);

        res.status(200).sendFile(uploadPath + file.filename);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:event_id/id/main', async (req, res) => {
    ///Returns the main image id for specified event id
    try{
        const {event_id} = req.params;
        const image = await db('event_files').where({event_id, mime_type: imageMimeType, main: true}).first();
        if(!image) throw new Error(404);
        res.status(200).send(JSON.stringify(image.id));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:event_id/image/main', async (req, res) => {
    ///Returns the main image for specified event id
    try{
        const {event_id} = req.params;
        const image = await db('event_files').where({event_id, mime_type: imageMimeType, main: true}).first();
        if(!image) throw new Error(404);
    
        res.status(200).sendFile(uploadPath + image.filename);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/:event_id/image/main', async (req, res) => {
    try{
        const {event_id} = req.params;
        const {image_id} = req.body;
       
        ///Remove main status from any previous image specified as main
        await db('event_files').where({event_id, main: true}).update({main: false});

        //Set new main image
        await db('event_files').where({event_id, id: image_id}).update({main: true});
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/:property_id/image/:image_id', checkAuth, async (req, res) => {
    try{
        const {image_id} = req.params;
        await db('event_files').where({id: image_id, mime_type: imageMimeType}).update(req.body);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:event_id', checkAuth, upload.single('image'), async (req, res) => {
    ///Uploads an image to be associated with the specified event
    var {event_body, property_body} = req;
    const {title, description} = req.body;

    if(event_body){
        event_body.title = title;
        event_body.description = description;
        await db('event_files').insert(event_body);
    }
    else if(property_body){
        property_body.title = title;
        property_body.description = description;
        await db('property_files').insert(property_body);
    }
    
    res.sendStatus(200);
});

router.delete('/image/:image_id', checkAuth, async (req, res) => {
    try{
        const {image_id} = req.params;
        const file = await db.select('filename').from('event_files').where({mime_type: imageMimeType, id: image_id}).first();

        DeleteFile(file.filename);
        
        await db('event_files').where({filename: file.filename}).del();
        res.sendStatus(200);

    }
    catch(err){
        RouteHandleError(err, res);
    }
})

module.exports = router;