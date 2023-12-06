import db from "kotilogi-app/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import {readFileSync} from 'fs';
import {uploadPath} from 'kotilogi-app/uploadsConfig';

export async function GET(req: NextRequest, {params}){
    /*
        Responds with the file mapped to the id.
    */
    try{
        const {searchParams} = new URL(req.url);
        const {file_id} = params;

        const tableName = searchParams.get('tableName');
        if(!tableName) throw new Error('Table name not present in query!');

        const data = await db(tableName).where({id: file_id}).select('fileName').first();
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