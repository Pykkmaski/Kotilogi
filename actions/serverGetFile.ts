"use server";

import {readFileSync} from 'fs';
import db from 'kotilogi-app/dbconfig';
import {uploadPath} from 'kotilogi-app/uploadsConfig';

export default async function serverGetFile(dbTableName: Kotilogi.Table, id: Kotilogi.IdType): Promise<Buffer | null>{
    try{
        const data = await db(dbTableName).where({id}).select('fileName').first();
        const filepath = uploadPath + data.filename;
        const fileBuffer: Buffer = readFileSync(filepath);
        return fileBuffer;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}