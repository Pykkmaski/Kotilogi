import db from "kotilogi-app/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import {readFileSync} from 'fs';
import {uploadPath} from 'kotilogi-app/uploadsConfig';

export async function GET(req: NextRequest, {params}){
    /*
        Responds with the image mapped to the id, from the provided database table.
    */
    try{
        const {file_id} = params;
        const {searchParams} = new URL(req.url);
        const dbTableName = searchParams.get('dbTableName');
        
        const data = await db(dbTableName).where({id: file_id}).select('fileName').first();
        const filepath = uploadPath + data.fileName;
        const fileBuffer = readFileSync(filepath);
        return new NextResponse(fileBuffer, {
            status: 200,
        });
    }   
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: 'Fetching of file failed due to a server error.',
        })
    }
}