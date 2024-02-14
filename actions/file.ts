'use server';
import { writeFile } from "fs/promises";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { limit, uploadPath } from "kotilogi-app/uploadsConfig";
import * as database from './database';
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";

function verifyFile(file: File){
    if(!file) {
        throw new Error('no_file');
    }

    if(file.type !== 'application/pdf' && file.type !== 'image/jpeg'){
        console.log(file.type);
        throw new Error('invalid_type');
    }

    if(file.size > limit){
        throw new Error('invalid_size');
    } 
}

/**
 * Uploads a file and saves its data into the database.
 * @param tablename The name of the table in the database where to save the data.
 * @param file
 * @param refId The id of the object the image belongs to, for example the id of a property.
 * @returns 
 */
export async function upload(tablename: 'propertyFiles' | 'eventFiles', refId: string, fdata: FormData){
    var addedFileName: string | null = null;

    return new Promise<Kotilogi.FileType>(async (resolve, reject) => {
        try{
            const file = fdata.get('file') as unknown as File;
            
            verifyFile(file);
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
        
            const fileName = Date.now() + fileNameTimestampSeparator + file.name;
            await writeFile(uploadPath + fileName, buffer);
            addedFileName = fileName;

            const fileData: Partial<Kotilogi.FileType> = {
                title: fileName,
                fileName,
                refId,
                mimeType: file.type as any,
            }

            const uploadedFileData = await database.add(tablename, fileData);
            resolve(uploadedFileData as unknown as Kotilogi.FileType);
        }
        catch(err){
            console.log(err.message);

            if(addedFileName !== null){
                //Delete the file in case of an error, if it was saved.
                await unlink(uploadPath + addedFileName);
            }

            reject(err);
        }
    }); 
}

export async function del(tablename: 'propertyFiles' | 'eventFiles', fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await unlink(uploadPath + fileData.fileName);
            await database.del(tablename, fileData);
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    })
}