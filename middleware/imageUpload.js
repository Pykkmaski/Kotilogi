const multer = require('multer');
const db = require('../dbconfig');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, path.join(__dirname, '../public/images'));
    },

    filename: async (req, file, cb) => {
        const fn = Date.now() + '--' + file.originalname;
        const {id} = req.params;

        try{
            await db('image_map').insert({
                filename: fn,
                property_id: id,
                event_id : null,
                property_main: false,
                event_main: false,
            });
            cb(null, fn);
        }
        catch(err){
            console.log(err.message);
        }

        
    }
});

const upload = multer({storage: fileStorageEngine});

module.exports = upload;