"use server";
import {join} from 'path';
import {writeFile} from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';

export default async function upload(data: FormData): Promise<boolean>{
    try{
        const file: File | null = data.get('file') as unknown as File;
        if(!file){
            throw new Error('No file present in the form data!');
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join(uploadPath as string, file.name);
        await writeFile(path, buffer);
        console.log(`Open ${path} to see the uploaded file`);

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}