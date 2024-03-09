'use server';
import { readFile, writeFile } from "fs/promises";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { limit, uploadPath } from "kotilogi-app/uploadsConfig";
import * as database from './database';
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { getFileSize } from "./util/getFileSize";
import db from "kotilogi-app/dbconfig";

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
 * Creates a buffer out of a file, and saves it to disk.
 * @param file 
 * @returns 
 */
async function saveToDisk(file: File): Promise<Kotilogi.FileType>{
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + fileNameTimestampSeparator + file.name;
    await writeFile(uploadPath + fileName, buffer);

    return {
        fileName,
        title: fileName,
        mimeType: file.type,
    } as Kotilogi.FileType;
}

/**
 * Uploads an array of files onto disk.
 * @param tablename The name of the table in the database where to save the data.
 * @param refId The id of the object the image belongs to, for example the id of a property.
 * @param fdata An array of FormData objects containing the files.
 * @returns An array of the results of the uploads.
 */
export async function upload(fdata: FormData[]): Promise<PromiseSettledResult<Kotilogi.FileType>[]>{
    const uploadPromises: Promise<Kotilogi.FileType>[] = [];
    for(const file of fdata){
        const f = file.get('file') as unknown as File;

        const verifyResult = await verifyFile(f);
        if(verifyResult !== 'success') throw new Error(verifyResult);

        uploadPromises.push(
            saveToDisk(f)
        );
    }

    return await Promise.allSettled(uploadPromises);
}

/**
 * Deletes a file from disk, and it's database entry.
 * @param tablename 
 * @param fileData 
 * @returns 
 */
export async function del(tablename: 'propertyFiles' | 'eventFiles', fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        //Backup the file in case of an error.
        let fileBackup: Buffer | null = null;
        let unlinkSuccess = false;
        let dataDeletionSuccess = false;

        const trx = await db.transaction();

        try{
            fileBackup = await readFile(uploadPath + fileData.fileName);

            await unlink(uploadPath + fileData.fileName).then(() => unlinkSuccess = true)
            await trx(tablename).where({id: fileData.id}).del().then(() => dataDeletionSuccess = true);
            
            await trx.commit();
            resolve();
        }
        catch(err){
            //Roll back the deletion if something goes wrong.
            console.log(err.message);

            try{
                if(fileBackup && unlinkSuccess){ 
                    //Re-save the file only if it was deleted.
                    await writeFile(uploadPath + fileData.fileName, fileBackup);
                }

                if(dataDeletionSuccess){
                    //Rollback the database only if the data was deleted.
                    trx.rollback();
                }
            }
            catch(err){
                console.log('Database rollback failed!: ', err.message);
                reject(err);
            }
            
            reject(err);
        }
    })
}