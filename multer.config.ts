import multer from 'multer';
import {multerPath} from 'kotilogi-app/uploadsConfig';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('In multer destination')
        cb(null, 'public/uploads');
    },

    filename: async (req, file, cb) => {
        console.log('In multer filename');
        const fn = Date.now() + '-' + file.originalname;
        cb(null, fn);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf'){
        cb(null, true);
    }
    else{
        console.log(`Unsupported file format! (${file.mimetype})`);
        cb({error: `Unsupported file format! (${file.mimetype})`}, false);
    }
}

export default multer({
    storage,
    fileFilter,
    limits: {
        fieldSize: 1024 * 1024 * 10,
    }
});

