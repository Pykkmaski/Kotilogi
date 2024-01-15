"use server";

import { limit } from 'kotilogi-app/uploadsConfig';
import { addData } from '../data/addData';
import { uploadFile } from './uploadFile';
import stringToDate from 'kotilogi-app/utils/stringToDate';

/**
 * Uploads files, and saves their info into a database table.
 * @param data An array of form data, containing a file and refId each.
 * @param tableName The name of the file data containing table.
 * @returns An array containing the newly inserted database entries of the files, or null in case of an error.
 */
export async function upload(data: FormData[], refId: Kotilogi.IdType, tableName: 'propertyFiles' | 'eventFiles'){

    return new Promise<Array<{id: Kotilogi.IdType, fileName: string}>>(async (resolve, reject) => {
        try{
          /**
          * An array containing the file data of all files that were saved successfully.
          */
            const successfullyInsertedFiles: {fileName: string, id: Kotilogi.IdType}[] = [];

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
    
              const fileName = await uploadFile(file);
              
              //Save the database entry for the file.
              const fileData = {
                title: fileName,
                fileName,
                mimeType: fileType,
                refId,
              }
              
              const result = await addData<Kotilogi.FileType>(tableName, fileData as any,);
              successfullyInsertedFiles.push({id: result.id, fileName: result.fileName});
            }
  
            resolve(successfullyInsertedFiles);
        }
        catch(err){
          console.log(err.message);
          reject(err);
        }
    });

    
}

