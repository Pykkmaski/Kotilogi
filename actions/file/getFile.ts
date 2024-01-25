"use server";

import {readFileSync} from 'fs';
import db from 'kotilogi-app/dbconfig';
import {uploadPath} from 'kotilogi-app/uploadsConfig';
import { logError } from 'kotilogi-app/utils/logError';

export async function getFile(dbTableName: Kotilogi.Table, id: Kotilogi.IdType): Promise<Buffer | null>{
    try{
        const data = await db(dbTableName).where({id}).select('fileName').first();
        if(!data) throw new Error('Could not load image!');
        
        const filepath = uploadPath + data.filename;
        const fileBuffer: Buffer = readFileSync(filepath);
        return fileBuffer;
    }
    catch(err){
        logError(err);
        return null;
    }
}