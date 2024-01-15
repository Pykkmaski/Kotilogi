import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import {unlink} from 'fs/promises';

export async function deleteFiles(tablename: 'propertyFiles' | 'eventFiles', files: Kotilogi.FileType[]){
    return new Promise<void>(async (resolve, reject) => {
        try{
            for(const file of files){
                await unlink(uploadPath + file.fileName);
                await db(tablename).where({id: file.id}).del();
            }
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}