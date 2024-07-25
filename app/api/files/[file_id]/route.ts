import db from 'kotilogi-app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { uploadPath } from 'kotilogi-app/uploadsConfig';

export async function GET(req: NextRequest, { params }) {
  /*
        Responds with the file mapped to the id.
    */
  try {
    /*
        const {searchParams} = new URL(req.url);
        const {file_id} = params;

        const tableName = searchParams.get('tableName');
        if(!tableName) throw new Error('Table name not present in query!');

        const data = await db(tableName).where({id: file_id}).select('fileName').first();

        if(!data) throw new Error(`A file with id ${file_id} could not be found in table ${tableName}!`);
        
        const filepath = uploadPath + data.fileName;
        const fileBuffer = readFileSync(filepath);
        return new NextResponse(fileBuffer, {
            status: 200,
        });
        */

    console.log('file id: ', params.file_id);
    const [filename] = (await db('data_files').where({ id: params.file_id }).pluck('name')) || [];

    //Return a default image in case none is found.
    if (!filename) return await fetch('/img/Properties/default-bg');

    const filepath = uploadPath + filename;
    const fileBuffer = readFileSync(filepath);
    return new NextResponse(fileBuffer, {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
      statusText: 'Fetching of file failed due to a server error.',
    });
  }
}
