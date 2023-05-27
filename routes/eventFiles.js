const router = require('express').Router();
const db = require('../dbconfig');
const path = require('path');
const checkAuth = require('../middleware/checkAuth');
const RouteHandleError = require('../Functions/RouteHandleError');
const upload = require('../middleware/fileUpload');
const fs = require('fs');
require('dotenv').config();

const pdfMimeType = 'application/pdf';
const fileStorageDest = process.env.FILE_UPLOAD_DEST;
console.log(__dirname);

router.get('/:event_id', checkAuth, async (req, res) => {
    ///Returns ids for files associated with given event id
    try{
        const {event_id} = req.params;
        const ids = await db('event_files').where({event_id, mime_type: pdfMimeType}) || [];
        if(!ids.length) throw 404;
        res.status(200).send(JSON.stringify(ids));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/:event_id', checkAuth, upload.single('file'), async (req, res) => {
    ///Uploads a PDF to be associated with an event
    res.sendStatus(200);
});

router.get('/file/:file_id', async (req, res) => {
    ///Returns specified file associated with given event id.
    try{
        const {file_id} = req.params;
        const file = await db('event_files').where({id: file_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(`../uploads/${file.filename}`);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/file/:file_id', async (req, res) => {
    try{
        const {file_id} = req.params;
        const file = await db('event_files').where({id: file_id}).first();
        if(!file) throw 404;
        fs.unlink(`../uploads/${file.filename}`, () => console.log(`File ${file.filename} deleted.`));
        await db('event_files').where({id: file_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

module.exports = router;