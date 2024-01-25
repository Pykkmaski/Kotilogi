'use server';

import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import {writeFile} from 'fs/promises';
import { logError } from "kotilogi-app/utils/logError";

export async function uploadFile(file: File){
    return new Promise<string>(async (resolve, reject) => {
        try{
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
        
            const fileName = Date.now() + fileNameTimestampSeparator + file.name;
        
            await writeFile(uploadPath + fileName, buffer);
            resolve(fileName);
        }
        catch(err){
            logError(err);
            reject(err);
        }
    });
}