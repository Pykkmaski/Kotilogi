const db = require('../dbconfig');
const router = require('express').Router();
const upload = require('../middleware/fileUpload');
const RouteHandleError = require('../Functions/RouteHandleError');

router.get('/property/:property_id/events/:event_id/:file_id', async (req, res) => {
    ///Returns the specified PDF file for a given event and property id
    try{
        const {property_id, event_id} = req.params;
        const entry = await db.select('filename').from('file_map').where({property_id, event_id, id: file_id}).first();
        if(!entry) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${entry.filename}`));
    }
    catch(err){
        RouteHandleError(err, res);
    }
});

router.post('/property/:property_id/events/:event_id', upload.single('file'), async (req, res) => {
    ///Post a PDF file to be associated with the specified event and property id.
    res.sendStatus(200);
})

module.exports = router;