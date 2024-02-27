'use server';
import { writeFile } from "fs/promises";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { limit, uploadPath } from "kotilogi-app/uploadsConfig";
import * as database from './database';
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { getFileSize } from "./util/getFileSize";

type FileVerifyResult = 'invalid_type' | 'invalid_size' | 'no_file' | 'success';

export async function verifyFile(file?: File): Promise<FileVerifyResult>{
    if(!file){
        return 'no_file'
    }
    else if(file.type !== 'application/pdf' && file.type !== 'image/jpeg'){
        return 'invalid_type'
    }
    else if(file.size > limit){
        return 'invalid_size'
    } 
    else{
        return 'success';
    }
}

/**
 * Uploads a file and saves its data into the database.
 * @param tablename The name of the table in the database where to save the data.
 * @param refId The id of the object the image belongs to, for example the id of a property.
 * @param fdata The FormData object containing the file.
 * @returns 
 */
export async function upload(tablename: 'propertyFiles' | 'eventFiles', refId: string, fdata: FormData){
    var addedFileName: string | null = null;

    return new Promise<Kotilogi.FileType>(async (resolve, reject) => {
        try{
            const file = fdata.get('file') as unknown as File;
            
            const verifyResult = await verifyFile(file);
            if(verifyResult !== 'success') return reject(verifyResult);

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

            if(tablename === 'propertyFiles'){
                revalidatePath('/properties/[property_id]/files');
                revalidatePath('/properties/[property_id]/images');
            }
            else if(tablename === 'eventFiles'){
                revalidatePath('/events/[event_id]/files');
                revalidatePath('/events/[event_id]/images');
            }

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

/**
 * Deletes files from disk, and their database entries.
 * @param tablename 
 * @param fileData 
 * @returns 
 */
export async function del(tablename: 'propertyFiles' | 'eventFiles', fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await unlink(uploadPath + fileData.fileName);
            await database.del(tablename, {id: fileData.id});

            if(tablename === 'propertyFiles'){
                revalidatePath('/properties/[property_id]/files');
                revalidatePath('/properties/[property_id]/images');
            }
            else if(tablename === 'eventFiles'){
                revalidatePath('/events/[event_id]/files');
                revalidatePath('/events/[event_id]/images');
            }
            
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    })
}