import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import uploadPath from "kotilogi-app/uploadsConfig";
import db from "kotilogi-app/dbconfig";

export async function GET(req, res){
    try{
        const {searchParams} = new URL(req.url);
        const data = await db(searchParams.get('dbTableName')).where({id: file_id}).select('filename', 'mime_type').first();
        const fileBuffer = fs.readFileSync(uploadPath + data.filename);
        return new NextResponse(fileBuffer, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: 'File fetching failed due to a server error.',
        })
    }
}