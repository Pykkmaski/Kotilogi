const multer = require('multer');
const db = require('../dbconfig');
const path = require('path');
require('dotenv').config();
const {multerPath} = require('../uploadsConfig');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, multerPath);
    },

    filename: async (req, file, cb) => {
        const fn = Date.now() + '--' + file.originalname;
        const {property_id, event_id} = req.params;
  
        try{
            if(event_id){
                //Automatically mark an image as the main image if there are no previous images uploaded.
                const counts = await db('event_files').count('*', {as: 'count'}).where({mime_type: 'image/jpeg', event_id});
                const main = counts[0].count === 0 && file.mimetype === 'image/jpeg';

                req.event_body = {
                    filename: fn,
                    event_id,
                    mime_type: file.mimetype,
                    main
                };
            }
            else if(property_id){
                //Ditto
                const counts = await db('property_files').count('*', {as: 'count'}).where({mime_type: 'image/jpeg', property_id});
                const main = counts[0].count === 0 && file.mimetype === 'image/jpeg';
                
                req.property_body = {
                    filename: fn,
                    property_id,
                    mime_type: file.mimetype,
                    main
                };
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