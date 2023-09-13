"use server";
import {join} from 'path';
import {writeFile} from 'fs/promises';
import { uploadPath, limit } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import generateId from 'kotilogi-app/utils/generateId';

type TargetIdType = 'property_id' | 'event_id';

function getTargetIdFieldName(tableName: Kotilogi.Table): TargetIdType{
  var targetIdFieldName: TargetIdType;
  if(tableName === 'property_files' || tableName === 'property_images'){
    targetIdFieldName = 'property_id';
  }
  else if(tableName === 'event_files' || tableName === 'event_images'){
    targetIdFieldName = 'event_id';
  }
  else{
    throw new Error(`Unsupported dbTableName in formData! (${tableName}). Cannot determine id field name!`);
  }

  return targetIdFieldName;
}

export default async function upload(data: FormData, tableName: Kotilogi.Table): Promise<object | null>{
    try{
        const file: File | null = data.get('file') as unknown as File;
        if(!file){
            throw new Error('No file present in the form data!');
        }
    
        //Only allow PDF's or JPEG's
        if(file.type !== 'image/jpeg' && 'application/pdf'){
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
          [getTargetIdFieldName(tableName)] : data.get('target_id') as TargetIdType,
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