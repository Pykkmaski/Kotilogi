import { unlink, writeFile } from "fs/promises";
import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { addData } from "./addData";

/**
 * Uploads a file to disk and returns an object with the file information and a rollback function.
 * @param file 
 * @returns 
 */
async function upload(file: File){

    console.log('Uploading a file ' + file.name);
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = Date.now() + fileNameTimestampSeparator + file.name;

    const rollback = async () => {
        await unlink(uploadPath + fileName);
    }

    await writeFile(uploadPath + fileName, buffer);

    return {
        fileData: {
            title: file.name,
            fileName: fileName,
            mimeType: file.type,
        },

        rollback,
    };
}

/**
 * Uploads a single file and adds its data into the database.
 * Can be used to upload a single file on its own, or as alongside adding of data that has files. In the latter case, provide a transaction object.
 * @param tablename 
 * @param file 
 * @param trx 
 */
export async function addFile(tablename: 'propertyFiles' | 'eventFiles', file: File, refId: string, trx?: Knex.Transaction){
    const dbcon = trx || db;
    const {fileData, rollback} = await upload(file);

    try{
        await dbcon(tablename).insert({
            ...fileData,
            refId
        });

        return rollback;
    }
    catch(err){
        await rollback();
        throw err;
    }
}