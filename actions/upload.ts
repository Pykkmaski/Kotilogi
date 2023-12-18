"use server";

import {join} from 'path';
import {writeFile, unlink} from 'fs/promises';
import { uploadPath, limit } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import generateId from 'kotilogi-app/utils/generateId';
import { serverAddData } from './serverAddData';
import serverDeleteFilesByIds from './serverDeleteFilesByIds';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';

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
 * Uploads files, saved their info into a database table.
 * @param data An array of form data, containing a file and refId each.
 * @param tableName The name of the file data containing table.
 * @returns An array containing the newly inserted database entries of the files, or null in case of an error.
 */
export default async function upload(data: FormData[], tableName: 'propertyFiles' | 'eventFiles'): Promise<Array<{id: Kotilogi.IdType, fileName: string}> | null>{

    /**
     * An array containing the file data of all files that were saved successfully.
     */
    const successfullyInsertedFiles: {fileName: string, id: Kotilogi.IdType}[] = [];

    try{
        for(const d of data){
          const file: File | null = d.get('file') as unknown as File;

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

          const fileName: string = Date.now() + fileNameTimestampSeparator + file.name;
          
          //Save the database entry for the file.
          const fileData = {
            fileName,
            mimeType: fileType,
            refId: d.get('refId'),
            description: d.get('description'),
          }

          const result = await serverAddData(fileData, tableName);
          if(!result) throw {
            code: 'DATABASE_FAILURE',
            fileName,
          }

          //Write the file to disk
          const path: string = join(uploadPath as string, fileName);
          await writeFile(path, buffer);
          successfullyInsertedFiles.push(result);
        }

        return successfullyInsertedFiles;
    }
    catch(err){
        console.log(err.message);

        //Delete all the successfully inserted files, if one of them fails to save.

        /**
         * An array containing the file names of any files that fail to delete.
         */
        const failedDeletions: {fileName: string, id: Kotilogi.IdType}[] = [];

        for(const fileData of successfullyInsertedFiles){ 
          try{
            await unlink(uploadPath + fileData.fileName);
            await db(tableName).where({fileName: fileData.fileName}).del();
          }
          catch(err){
            console.log(err.message);
            failedDeletions.push(fileData);
          }
          
        }

        return null;
    }
}

