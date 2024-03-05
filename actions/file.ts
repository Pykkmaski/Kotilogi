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
async function saveToDisk(file: File){
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + fileNameTimestampSeparator + file.name;
    await writeFile(uploadPath + fileName, buffer);
    return fileName;
}

/**
 * Uploads a file and saves its data into the database.
 * @param tablename The name of the table in the database where to save the data.
 * @param refId The id of the object the image belongs to, for example the id of a property.
 * @param fdata The FormData object containing the file.
 * @returns 
 */
export async function upload(tablename: 'propertyFiles' | 'eventFiles', refId: string, fdata: FormData){
    return new Promise<Kotilogi.FileType>(async (resolve, reject) => {
        var addedFileName: string | null = null;
        const trx = await db.transaction();
        let fileUplodedSuccessfully = false;
        let dataSavedSuccessfully = false;

        try{
            const file = fdata.get('file') as unknown as File;
            const verifyResult = await verifyFile(file);
            if(verifyResult !== 'success') return reject(verifyResult);

            addedFileName = await saveToDisk(file).then((fileName) => {
                fileUplodedSuccessfully = true
                return fileName;
            });

            const fileData: Partial<Kotilogi.FileType> = {
                title: addedFileName,
                fileName: addedFileName,
                refId,
                mimeType: file.type as any,
            }

            const [uploadedFileData] = await trx(tablename).insert(fileData, '*').then((data: Kotilogi.FileType[]) => {
                dataSavedSuccessfully = true;
                return data;
            });

            await trx.commit();
            resolve(uploadedFileData as unknown as Kotilogi.FileType);
        }
        catch(err){
            console.log(err.message);

            try{
                if(fileUplodedSuccessfully){
                    //Delete the file in case of an error, if it was saved.
                    await unlink(uploadPath + addedFileName);
                }

                if(dataSavedSuccessfully){
                    //Rollback the db if the data was saved.
                    await trx.rollback();
                }
            }
            catch(err){
                console.log('Rollback failed!: ', err.message);
                reject(err);
            }

            reject(err);
        }
    }); 
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