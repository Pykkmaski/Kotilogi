const multer = require('multer');
const db = require('../dbconfig');
const path = require('path');
require('dotenv').config();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },

    filename: async (req, file, cb) => {
        const fn = Date.now() + '--' + file.originalname;
        const {property_id, event_id} = req.params;

        try{
            if(event_id){
                await db('event_files').insert({
                    filename: fn,
                    event_id,
                    mime_type: file.mimetype,
                    title: file.title,
                    description: file.description,
                });
            }
            else if(property_id){
                await db('property_files').insert({
                    filename: fn,
                    property_id,
                    mime_type: file.mimetype,
                    title: file.title,
                    description: file.description,
                });
            }
        }
        catch(err){
            console.log(err.message);
        }

        cb(null, fn);
    }
});

const fileFilterEngine = (req, file, cb) => {
    if(file.mimeType === 'image/jpeg' || file.mimeType === 'application/pdf'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({storage: fileStorageEngine});

module.exports = upload;