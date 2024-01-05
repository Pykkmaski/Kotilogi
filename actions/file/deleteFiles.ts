import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import {unlink} from 'fs/promises';

export async function deleteFiles(tablename: string, refId: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const filenames = await db(tablename).where({refId});
            for(const filename of filenames){
                await unlink(uploadPath + filename);
            }
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}