"use server";

import {join} from 'path';
import {writeFile, unlink} from 'fs/promises';
import { uploadPath, limit } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import generateId from 'kotilogi-app/utils/generateId';
import { serverAddData } from './serverAddData';
import serverDeleteFilesByIds from './serverDeleteFilesByIds';

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


/**
 * Uploads files and returns the associated database entry, or null in case of an error.
 * @param data 
 * @returns 
 */
export default async function upload(data: FormData): Promise<object | null>{
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

        const fileName: string = Date.now() + '-' + file.name;
        
        //Save the database entry for the file.
        const fileData = {
          fileName,
          mimeType: fileType,
          refId: data.get('refId'),
          description: data.get('description'),
        }

        const result = await serverAddData(fileData, 'files');
        if(!result) throw {
          code: 'DATABASE_FAILURE',
          fileName,
        }

        //Write the file to disk
        
        const path: string = join(uploadPath as string, fileName);
        await writeFile(path, buffer);

        return result;
    }
    catch(err){
        //If the file was writted to disk and the database entry failed to save, delete the file.
        if('code' in err && 'fileName' in err && err.code === 'DATABASE_FAILURE'){
          console.log('File database entry failed to save. Deleting the file from disk.');
          await unlink(uploadPath + err.fileName);
        }
        else if(err instanceof Error){
          console.log(err.message);
        }

        return null;
    }
}