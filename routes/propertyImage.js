const router = require('express').Router();
const path = require('path');
const upload = require('../middleware/fileUpload');
const db = require('../dbconfig');

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
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
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
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
});

router.get('/property/:property_id/events/:event_id/main', async (req, res) => {
    ///Fetches the main image for a given event.
    try{
        const {property_id, event_id} = req.params;
        const entry = await db.select('filename').from('file_map').where({property_id, event_id}).first();
        if(!entry) throw 404;

        res.status(200).sendFile(path.join(__dirname, `../uploads/${entry.filename}`));
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
});

router.get('/ids/property/:property_id/events/:event_id', async (req, res) => {
    ///Returns all image ids for a specified event
    try{
        const {property_id, event_id} = req.params;
        const ids = await db('file_map').where({property_id, event_id}).pluck('id');
        if(!ids.length) throw 404;
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
})

router.post('/property/:property_id', upload.single('image'), async (req, res) => {
    ///Posts an image to be associated with given property.
    res.sendStatus(200);
});

router.post('/property/:property_id/events/:event_id', upload.single('image'), async (req, res) => {
    ///Posts an image to be associated with given event id belonging to specified property.
    res.sendStatus(200);
})

module.exports = router;