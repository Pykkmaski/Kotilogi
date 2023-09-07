import multer from 'multer';
import {multerPath} from 'kotilogi-app/uploadsConfig';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, multerPath as string);
    },

    filename: (req, file, cb) => {
        const newFileName: string = Date.now() + '-' + file.originalname;
        console.log(newFileName);
        cb(null, newFileName);
    }
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    }
});