"use server";

import {join} from 'path';
import {writeFile} from 'fs/promises';
import { uploadPath, limit } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import generateId from 'kotilogi-app/utils/generateId';

type TargetIdType = 'property_id' | 'event_id';

async function setMainImage(tableName: Kotilogi.Table, refId: Kotilogi.IdType, imageId: Kotilogi.IdType){
  const images = await db(tableName).where({refId});
  if(images.length == 1){
    if(tableName === 'propertyImages'){
      await db('properties').where({id: refId}).update({
        mainImageId: imageId,
      });
    }
    else if(tableName === 'eventImages'){
      await db('propertyEvents').where({id: refId}).update({
        mainImageId: imageId,
      })
    }
  }
}

export default async function upload(data: FormData, tableName: Kotilogi.Table): Promise<string | null>{
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
        const fileName: string = Date.now() + '-' + file.name;
        const path: string = join(uploadPath as string, fileName);
        await writeFile(path, buffer);
        
        return fileName;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}