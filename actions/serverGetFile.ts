"use server";

import {readFileSync} from 'fs';
import db from 'kotilogi-app/dbconfig';
import uploadsConfig from 'kotilogi-app/uploadsConfig';

export default async function serverGetFile(dbTableName: 'property_files' | 'event_files', id: Kotilogi.IdType): Promise<Buffer | null>{
    try{
        const data = await db(dbTableName).where({id}).select('filename').first();
        const filepath = uploadsConfig + data.filename;
        const fileBuffer: Buffer = readFileSync(filepath);
        return fileBuffer;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}