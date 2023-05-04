const router = require('express').Router();
const fs = require('fs');
const db = require('../dbconfig');
const path = require('path');
const RouteHandleError = require('../Functions/RouteHandleError');

router.get('/:image_id', async (req, res) => {
    ///Returns the specified image
    try{
        const {image_id} = req.params;
        const file = await db('event_files').where({id: image_id}).first();
        if(!file) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${file.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.delete('/:image_id', async (req, res) => {
    ///Deletes the specified event image
    try{
        const {event_id, image_id} = req.params;
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