const router = require('express').Router();
const db = require('../dbconfig');
const path = require('path');
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/RouteHandleError');
const upload = require('../middleware/fileUpload');

const pdfMimeType = 'application/pdf';

router.get('/:property_id', async (req, res) => {
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

router.get('/file/:file_id', async (req, res) => {
    ///Returns specified file associated with given property id./
    try{
        const {file_id} = req.params;
        const file = await db('property_files').where({id: file_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:property_id', checkAuth, upload.single('file'), async (req, res) => {
    ///Uploads a PDF to be associated with a property
    res.sendStatus(200);
});

module.exports = router;