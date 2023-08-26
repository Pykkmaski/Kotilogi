import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const {event_id} = params;
        const events = await db('event_files').where({event_id});
        return new NextResponse(JSON.stringify(events), {
            status: 200
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function POST(req, {params}){
    try{
        const {event_id} = params;
        const file = await req.json();
        await db('event_files').insert({
            ...file,
            event_id,
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