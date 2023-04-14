const multer = require('multer');
const db = require('../dbconfig');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, '../images/');
    },

    filename: (req, file, cb) => {
        const fn = Date.now() + '--' + file.originalname;
        const {property_id, event_id} = req.params;
        
        cb(null, fn);
    }
});

const upload = multer({storage: fileStorageEngine});

module.exports = upload;