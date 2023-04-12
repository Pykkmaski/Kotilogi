const multer = require('multer');
const db = require('../dbconfig');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images');
    },

    filename: async (req, file, cb) => {
        const fn = Date.now() + '--' + file.originalname;
        const {property_id, event_id} = req.params;
        try{
            await db('image_map').insert({
                filename: fn,
                property_id,
                event_id
            });
        }
        catch(err){
            req.multerFileStorageError = err;
        }
        
        cb(null, fn);
    }
});

const upload = multer({storage: fileStorageEngine});

module.exports = upload;