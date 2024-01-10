import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import {unlink} from 'fs/promises';

export async function deleteFiles(tablename: string, refId: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const files = await db(tablename).where({refId}) as Kotilogi.FileType[];
            for(const file of files){
                await unlink(uploadPath + file.fileName);
            }
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}