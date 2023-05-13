const db = require('../dbconfig');
const router = require('express').Router();
const upload = require('../middleware/fileUpload');
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/RouteHandleError');
const path = require('path');

const imageMimeType = 'image/jpeg';

router.get('/:property_id', checkAuth, async (req, res) => {
    ///Returns all image ids for the specified property
    try{
        const {property_id} = req.params;
        const imageIds = await db('property_files').where({property_id, mime_type: imageMimeType});
        if(!imageIds.length) throw 404;
        res.status(200).send(JSON.stringify(imageIds));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/:property_id/main', async (req, res) => {
    ///Returns the main image for specified property id
    try{
        const {property_id} = req.params;
        const image = await db('property_files').where({property_id, mime_type: imageMimeType, main: true}).first();
        if(!image) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${image.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/image/:image_id', async (req, res) => {
    ///Returns the image file mapped to the specified image id.
    try{   
        const {image_id} = req.params; 
        const file = await db('property_files').where({mime_type: imageMimeType, id: image_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id', checkAuth, upload.single('image'), async (req, res) => {
    ///Uploads an image to be associated with a given property id
    res.sendStatus(200);
});

router.delete('/image/:image_id', checkAuth, async (req, res) => {
    try{
        const {image_id} = req.params;
        const file = await db.select('filename').from('property_files').where({mime_type: imageMimeType, id: image_id}).first();
        fs.unlink(path.join(__dirname, `../uploads/${file.filename}`));
        await db('property_files').where({filename: file.filename}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
})

module.exports = router;