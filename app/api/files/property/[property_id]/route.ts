import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const {property_id} = params;
        const files = await db('property_files').where({property_id});
        return new NextResponse(JSON.stringify(files), {
            status: 200
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function POST(req, {params}){
    try{
        const {property_id} = params;
        const file = await req.json();
        await db('property_files').insert({
            ...file,
            property_id,
        })
        return new NextResponse(null, {
            status: 201,
            statusText: 'File posted successfully!'
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}