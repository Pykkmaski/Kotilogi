import db from "kotilogi-app/dbconfig";
import {readFile} from 'fs/promises';
import { NextRequest, NextResponse } from "next/server";
import { uploadPath } from "kotilogi-app/uploadsConfig";

export async function GET(request: NextRequest){
    try{
        const {searchParams} = new URL(request.url);
        const {filename} = await db(searchParams.get('dbTableName')).where({id: searchParams.get('id')}).select('filename').first();
        const buffer = await readFile(uploadPath + filename);
        return new NextResponse(buffer, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: 'File fetching failed because of a server error.',
        })
    }
}

export async function DELETE(request: NextRequest){
    try{
        const {searchParams} = new URL(request.url);
        await db(searchParams.get('dbTableName')).where({id: searchParams.get('id')}).del();
        return new NextResponse(null, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err, {
            status: 500,
            statusText: 'File deletion failed due to a server error.',
        });
    }
}