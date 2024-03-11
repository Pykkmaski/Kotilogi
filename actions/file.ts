'use server';
import { readFile, writeFile } from "fs/promises";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { limit, uploadPath } from "kotilogi-app/uploadsConfig";
import * as database from './database';
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { getFileSize } from "./util/getFileSize";
import db from "kotilogi-app/dbconfig";
import { Knex } from "knex";

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
 * @returns An array of the file data, and a function to rollback the upload.
 */
export async function upload(fdata: FormData[]){
    const uploadedFiles: Kotilogi.FileType[] = [];
    let uploadPromises: Promise<void>[] = [];

    const rollbackUpload = async () => {
        for(const uploadedFile of uploadedFiles){
            await unlink(uploadPath + uploadedFile.fileName);
        }
    }

    try{
        for(const file of fdata){
            const f = file.get('file') as unknown as File;
    
            const verifyResult = await verifyFile(f);
            if(verifyResult !== 'success') throw new Error(verifyResult);
    
            uploadPromises.push(new Promise<void>(async (resolve, reject) => {
                try{
                    const fileData = await saveToDisk(f);
                    uploadedFiles.push(fileData);
                    resolve();
                }
                catch(err){
                    reject(err);
                }
            }));
        }
        await Promise.all(uploadPromises);
        return [uploadedFiles, rollbackUpload] as const;
    }
    catch(err){
        try{
            await rollbackUpload();
        }
        catch(err){
            console.log('File upload rollback failed!');
        }
    }
}

export async function del(fileData: Kotilogi.FileType[]){
    type BackupFileType = {
        fileName: string,
        buffer: Buffer,
    };

    let backupFiles: BackupFileType[] = [];
    let deletedFiles: BackupFileType[] = [];

    const rollbackDelete = async () => {
        const rollbackPromises: Promise<void>[] = [];
        for(const deletedFile of deletedFiles){
            rollbackPromises.push(
                writeFile(uploadPath + deletedFile.fileName, deletedFile.buffer)
            )
        }
        await Promise.allSettled(rollbackPromises);
    }

    try{
        //Backup the files about to be deleted:
        const backupFilePromises: Promise<BackupFileType>[] = [];
        for(const data of fileData){
            backupFilePromises.push(
                new Promise<BackupFileType>(async (resolve, reject) => {
                    try{
                        const buffer = await readFile(uploadPath + data.fileName);
                        resolve({
                            fileName: data.fileName,
                            buffer,
                        });
                    }
                    catch(err){
                        console.log(err.message);
                        reject(err);
                    }
                })
            )
        }

        backupFiles = await Promise.allSettled(backupFilePromises).then(results => {
            const backupFiles = [];
            results.forEach(result => {
                if(result.status === 'fulfilled'){
                    backupFiles.push(result.value);
                }
            });

            return backupFiles;
        });

        const deletePromises: Promise<void>[] = [];
        for(const data of fileData){
            deletePromises.push(
                unlink(uploadPath + data.fileName)
            );
        }
        await Promise.all(deletePromises);

        return rollbackDelete;
    }
    catch(err){
        await rollbackDelete();
    }
}

/**
 * Deletes a file from disk, and it's database entry, using a transaction.
 * @param trx
 * @param tablename 
 * @param fileData 
 * @returns 
 */
export async function delViaTransaction(trx: Knex.Transaction, tablename: 'propertyFiles' | 'eventFiles', fileData: Kotilogi.FileType){
    let fileBackup: Buffer | null = null;
    let unlinkSuccess = false;

    try{
        fileBackup = await readFile(uploadPath + fileData.fileName);
        await unlink(uploadPath + fileData.fileName).then(() => unlinkSuccess = true);
        await trx(tablename).where({id: fileData.id}).del();
    }
    catch(err){
        //Roll back the deletion if something goes wrong.
        console.log(err.message);

        try{
            if(unlinkSuccess){ 
                //Re-save the file only if it was deleted.
                await writeFile(uploadPath + fileData.fileName, fileBackup);
            }
        }
        catch(err){
            console.log('File re-save failed!: ', err.message);
            throw err;
        }
        
        throw err;
    }
}

export async function unlinkMultiple(trx: Knex.Transaction, tablename: 'propertyFiles' | 'eventFiles', fileData: Kotilogi.FileType[]){
    const unlinkPromises: Promise<void>[] = [];

    for(const file of fileData){
        unlinkPromises.push(
            delViaTransaction(trx, tablename, file)
        );
    }

    await Promise.all(unlinkPromises);
}