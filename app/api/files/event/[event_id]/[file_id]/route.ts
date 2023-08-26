import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}){
    try{
        const {file_id} = params;
        await db('event_files').where({id: file_id}).del()
        return new NextResponse(null, {
            status: 201,
            statusText: 'File deleted successfully!'
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function PUT(req, {params}){
    try{
        const {file_id} = params;
        const file = await req.json();

        await db('event_files').where({id: file_id}).update(file);
        return new NextResponse(null, {
            status: 201,
            statusText: 'File updated successfully!'
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}