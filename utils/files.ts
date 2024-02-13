import { writeFile } from "fs/promises";
import { Database } from "./database";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
const path = require('path');
const env = process.env.UPLOAD_ENV || 'development';
const uploadSizeLimit = process.env.UPLOAD_FILESIZE_LIMIT;

type FileTable = 'propertyFiles' | 'eventFiles';

class Files extends Database<Kotilogi.FileType>{

    private fileNameTimestampSeparator: string = '--';

    private uploadPath =  env === 'development' ? path.join(process.cwd(), '/uploads/') : process.env.UPLOAD_PATH;
    private sizeLimit: number = uploadSizeLimit ? parseInt(uploadSizeLimit) : 1024 * 1024 * 5;

    constructor(tablename: FileTable){
        super(tablename);
    }

    private verifyFile(file: File){
        if(!file){
            throw new Error('no_file');
        }

        //Only allow PDF's or JPEG's
        const fileType: string = file.type;

        if(fileType !== 'application/pdf' && fileType !== 'image/jpeg'){
            throw new Error('unsupported');
        }

        //Only process files within an allowed size.
        if(file.size > this.sizeLimit) {
            throw new Error('invalid_size');
        }
    }

    async upload(file: File, refId: Kotilogi.IdType){
        return new Promise<string>(async (resolve, reject) => {
            try{
                this.verifyFile(file);

                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
            
                const fileName = Date.now() + this.fileNameTimestampSeparator + file.name;
            
                await writeFile(this.uploadPath + fileName, buffer);

                await super.add({
                    title: fileName,
                    refId,
                    fileName,
                    mimeType: file.type as any,
                });

                resolve(fileName);
            }
            catch(err){
                console.log(err.message);
                reject(err);
            }
        });
    }
}

/**Returns a Files instance for manipulating files in a specified file table. */
export const propertyFiles = new Files('propertyFiles');
export const eventFiles = new Files('eventFiles');