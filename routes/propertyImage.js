const router = require('express').Router();
const path = require('path');
const upload = require('../middleware/fileUpload');
const db = require('../dbconfig');
const fs = require('fs');
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/RouteHandleError');

router.get('/property/:property_id/main', async (req, res) => {
    ///Fetches the defined main image for a property.
    const {property_id} = req.params;

    try{
        const filename = await db.select('filename').from('file_map').where({property_id}).first() // Change this to actually get the image labeled as property main.
        console.log(filename, id);
        if(!filename) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${filename.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/property/:property_id/:image_id', async (req, res) => {
    ///Fetches specific image belonging to a given property, event specific or otherwise.
    try{
        const {property_id, image_id} = req.params;
        const entry = await db.select('filename').from('file_map').where({property_id, id: image_id}).first();
        if(!entry) throw 404;

        res.status(200).sendFile(path.join(__dirname, `../uploads/${entry.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/property/:property_id/events/:event_id/:image_id/main', checkAuth, async (req, res) => {
    ///Sets specified image as the main image
    try{
        const {property_id, image_id, event_id} = req.params;
        //Remove main status of all images for the specified event first
        await db('file_map').where({property_id, event_id}).update({event_main: false});
        await db.select('event_main').from('file_map').where({id: image_id}).update({event_main: true});
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/property/:property_id/:image_id', async (req, res) => {
    try{
        const {property_id, image_id} = req.params;
        console.log(image_id);
        const entry = await db('file_map').where({id: image_id}).first();
        await db('file_map').where({id: image_id}).del();
        fs.unlink(path.join(__dirname, `../uploads/${entry.filename}`), () => console.log('File deleted?'));
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/property/:property_id/events/:event_id/main', async (req, res) => {
    ///Fetches the main image for a given event.
    try{
        const {property_id, event_id} = req.params;
        const entry = await db.select('filename').from('file_map').where({property_id, event_id, event_main: true}).first();
        if(!entry) throw 404;

        res.status(200).sendFile(path.join(__dirname, `../uploads/${entry.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/ids/property/:property_id/events/:event_id', async (req, res) => {
    ///Returns all image ids for a specified event
    try{
        const {property_id, event_id} = req.params;
        const ids = await db('file_map').where({property_id, event_id, mime_type: 'image/jpeg'}).pluck('id');
        if(!ids.length) throw 404;
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
})

router.get('/events/:event_id', checkAuth, async (req, res) => {
    ///Returns all image ids associated with event_id
    try{
        const {event_id} = req.params;
        const ids = await db.select('id').from('file_map').where({event_id}).pluck('id');
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/property/:property_id', checkAuth, upload.single('image'), async (req, res) => {
    ///Posts an image to be associated with given property.
    res.sendStatus(200);
});

router.post('/property/:property_id/events/:event_id', checkAuth, upload.single('image'), async (req, res) => {
    ///Posts an image to be associated with given event id belonging to specified property.
    res.sendStatus(200);
})

module.exports = router;