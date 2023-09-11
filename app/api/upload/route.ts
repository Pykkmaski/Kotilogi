import { NextRequest, NextResponse } from 'next/server';
import {join} from 'path';
import {writeFile, readFile} from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import generateId from 'kotilogi-app/utils/generateId';
import uploadPath from 'kotilogi-app/uploadsConfig';

type TargetIdType = 'property_id' | 'event_id';
type Table = 'property_files' | 'event_files';
type FileTypes = PropertyFileType | EventFileType | PropertyImageType | EventImageType;

function getTargetIdFieldName(tableName: Table): TargetIdType{
  var targetIdFieldName: TargetIdType;
  if(tableName === 'property_files'){
    targetIdFieldName = 'property_id';
  }
  else if(tableName === 'event_files'){
    targetIdFieldName = 'event_id';
  }
  else{
    throw new Error(`Unsupported dbTableName in formData! (${tableName}). Cannot save the file info into the database`);
  }

  return targetIdFieldName;
}

export async function POST(req, res){
  try{
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    if(!file){
        throw new Error('No file present in the form data!');
    }

    //Only allow PDF's or JPEG's
    if(file.type !== 'image/jpeg' && 'application/pdf'){
      throw new Error(`Unsupported file type detected (${file.type})`);
    }

    //Only process files within an allowed size.
    const maxFileSize = 1024 * 1024 * 5; //Five megabytes.
    if(file.size > maxFileSize) throw new Error(`File size (${file.size}) exceedes allowed limit! (${maxFileSize})`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //Write the file to disk
    const filename: string = Date.now() + '-' + file.name;
    const path: string = join(uploadPath as string, filename);
    await writeFile(path, buffer);

    const tableName: Table = data.get('dbTableName');

    const dbData: FileTypes = {
      filename,
      title: data.get('title'),
      description: data.get('description'),
      [getTargetIdFieldName(tableName)] : data.get('target_id') as TargetIdType,
      mime_type: file.type as 'image/jpeg' | 'application/pdf',
      id: await generateId(),
    } as FileTypes;

    await db(tableName).insert(dbData);

    console.log(`Open ${path} to see the uploaded file`);

    return new NextResponse(null, {
      status: 200,
      statusText: 'File uploaded successfully!',
    });
  }
  catch(err){
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
      statusText: 'File upload failed due to a server error',
    });
  }
}