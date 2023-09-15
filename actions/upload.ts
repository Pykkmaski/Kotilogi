"use server";

import {join} from 'path';
import {writeFile} from 'fs/promises';
import { uploadPath, limit } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import generateId from 'kotilogi-app/utils/generateId';

type TargetIdType = 'property_id' | 'event_id';

export default async function upload(data: FormData, tableName: Kotilogi.Table): Promise<object | null>{
    try{
        const file: File | null = data.get('file') as unknown as File;
        if(!file){
            throw new Error('No file present in the form data!');
        }
    
        //Only allow PDF's or JPEG's
        const fileType: string = file.type;

        if(fileType !== 'application/pdf' && fileType !== 'image/jpeg'){
          throw new Error(`Unsupported file type detected (${file.type})`);
        }
    
        //Only process files within an allowed size.
        if(file.size > limit) throw new Error(`File size (${file.size}) exceedes allowed limit! (${limit})`);
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        //Write the file to disk
        const filename: string = Date.now() + '-' + file.name;
        const path: string = join(uploadPath as string, filename);
        await writeFile(path, buffer);
    
        const dbData = {
          filename,
          title: data.get('title'),
          description: data.get('description'),
          ref_id : data.get('ref_id'),
          mime_type: fileType,
          id: await generateId(),
        };
    
        const insertedData = await db(tableName).insert(dbData, '*');
    
        console.log(`Open ${path} to see the uploaded file`);
        return insertedData[0];
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}