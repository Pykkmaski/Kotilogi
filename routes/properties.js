const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const upload = require('../middleware/fileUpload');
const db = require('../dbconfig');
const RouteHandleError = require('../Functions/RouteHandleError');
const path = require('path');
const fs = require('fs');

const imageMimeType = 'image/jpeg';
const pdfMimeType = 'application/pdf';

router.get('/', checkAuth, async (req, res) => {
    ///Returns all properties belonging implicitly to the client making the request.
    try{
        const {user} = req;
        const properties = await db('properties').where({owner: user.email});
        res.status(200).send(JSON.stringify(properties));

    }catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id', checkAuth, async (req, res) => {
    ///Returns the property with the given ID.
    try{
        const {property_id} = req.params;
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw new Error(`Property with ID ${property_id} does not exist!`);
        res.status(200).send(JSON.stringify(property));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events', checkAuth, async (req, res) => {
    ///Returns all events for given property.
    try{
        const {property_id} = req.params;
        const history = await db('property_events').where({property_id}).orderBy('date', 'asc');
        if(!history.length) throw 404;

        if(history[0].owner !== req.user.username) throw 403; //This will not work yet, as there is no owner field for property events entries.

        res.status(200).send(JSON.stringify(history));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    ///Returns event with specified id.
    try{
        const {property_id, event_id} = req.params;
        const event = await db('property_events').where({property_id, id: event_id}).first();
        if(!event) throw 404;

        res.status(200).send(JSON.stringify(event));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/images', checkAuth, async (req, res) => {
    ///Returns all image ids for the specified property
    try{
        const {property_id} = req.params;
        const imageIds = await db('property_files').where({property_id, mime_type: imageMimeType}).pluck('id') || [];
        if(!imageIds.length) throw 404;
        res.status(200).send(JSON.stringify(imageIds));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/images/main', async (req, res) => {
    ///Returns the main image for specified property id
    try{
        const {property_id} = req.params;
        const image = await db('property_files').where({property_id, mimeType: imageMimeType, main: true}).first();
        if(!image) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${image.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/images/:image_id', async (req, res) => {
    ///Returns the image file mapped to the specified image id.
    try{   
        const {property_id, image_id} = req.params; 
        const file = await db('property_files').where({property_id, mime_type: imageMimeType, id: image_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events/:event_id/images', checkAuth, async (req, res) => {
    ///Returns all image ids for the specified event
    try{
        const {property_id, event_id} = req.params;
        const ids = await db('event_files').where({event_id, mime_type: imageMimeType}).pluck('id');
        if(!ids) throw 404;
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events/:event_id/images/main', async (req, res) => {
    ///Returns the main image for specified event id
    try{
        const {property_id, event_id} = req.params;
        const image = await db('event_files').where({event_id, mime_type: imageMimeType, main: true}).first();
        if(!image) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${image.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id/events/:event_id/images/main/:image_id', async (req, res) => {
    try{
        const {property_id, event_id, image_id} = req.params;
        ///Remove main status from any previous image specified as main
        await db('event_files').where({event_id, main: true}).update({main: false});
        await db('event_files').where({event_id, id: image_id}).update({main: true});
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events/:event_id/images/:image_id', async (req, res) => {
    ///Returns the specified image
    try{
        const {event_id, image_id, property_id} = req.params;
        const file = await db('event_files').where({event_id, id: image_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/files', async (req, res) => {
    ///Returns ids for files associated with given property id
    try{
        const {property_id} = req.params;
        const ids = await db('property_files').where({property_id, mime_type: pdfMimeType}) || [];
        if(!ids.length) throw 404;
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/files/:file_id', async (req, res) => {
    ///Returns specified file associated with given property id./
    try{
        const {property_id, file_id} = req.params;
        const file = await db('property_files').where({property_id, id: file_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events/:event_id/files', checkAuth, async (req, res) => {
    ///Returns ids for files associated with given event id
    try{
        const {property_id, event_id} = req.params;
        const ids = await db('event_files').where({event_id, mime_type: pdfMimeType}) || [];
        if(!ids.length) throw 404;
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/events/:event_id/files/:file_id', async (req, res) => {
    ///Returns specified file associated with given event id.
    try{
        const {property_id, file_id, event_id} = req.params;
        const file = await db('event_files').where({event_id, id: file_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/energy_usage', checkAuth, async (req, res) => {
    try{

    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id/energy_usage', checkAuth, async (req, res) => {
    try{
        
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.put('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    ///Updates event with given id belonging to property with given id.
    try{
        const {property_id, event_id} = req.params;
        const data = req.body;
        await db('property_events').where({property_id, id: event_id}).update(data);
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/', checkAuth, async (req, res) => {
    ///Inserts new property data
    try{
        const data = req.body;
        data.owner = req.user.email;
        console.log(req.body);

        const id = (await db('properties').insert(data, ['id']))[0];
        console.log(id);
        res.status(200).send(id);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id/events', checkAuth, async (req, res) => {
    ///Insert new event data for given property
    try{
        const {property_id} = req.params;
        const {name, description, date} = req.body;
        console.log(date);
        const property = await db('properties').where({id: property_id}).first();
        if(!property) throw 403;

        db('property_events').insert({name, description, date, property_id}, ['id']).then(arr => {
            const data = arr[0];
            console.log(data);
            res.status(200).send(JSON.stringify(data));
        });
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id/images', checkAuth, upload.single('image'), async (req, res) => {
    ///Uploads an image to be associated with a given property id
    res.sendStatus(200);
});

router.post('/:property_id/files', checkAuth, upload.single('file'), async (req, res) => {
    ///Uploads a PDF to be associated with a property
    res.sendStatus(200);
});

router.post('/:property_id/events/:event_id/files', checkAuth, upload.single('file'), async (req, res) => {
    ///Uploads a PDF to be associated with an event
    res.sendStatus(200);
});

router.post('/:property_id/events/:event_id/images', checkAuth, upload.single('image'), async (req, res) => {
    ///Uploads an image to be associated with the specified event
    res.sendStatus(200);
});

router.delete('/:property_id', checkAuth, async (req, res) => {
    ///Deletes the property with given ID.
    try{
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    ///Deletes event with given id belonging to specified property.
    try{
        const {property_id, event_id} = req.params;
        await db('property_events').where({property_id, id : event_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/:property_id/events/:event_id/images/:image_id', async (req, res) => {
    ///Deletes the specified event image
    try{
        const {property_id, event_id, image_id} = req.params;
        const file = await db.select('filename').from('event_files').where({event_id, id: image_id}).first();
        await db('event_files').where({filename: file.filename}).del();
        fs.unlink(path.join(__dirname, `../uploads/${file.filename}`), () => console.log(`File ${file.filename} deleted.`));
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});


module.exports = router;