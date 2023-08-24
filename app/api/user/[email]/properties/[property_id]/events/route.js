import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try{
        const {property_id} = params;
        const events = await db('property_events').where({property_id});
        return new NextResponse(JSON.stringify(events), {
            status: 200,
        })
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function POST(request, {params}){
    try{
        const event = await request.json();
        const insertedIds = await db('property_events').insert(event);
        return new NextResponse(insertedIds.at(0).id, {
            status: 200,
        })
    }
    catch(err){
        return routeErrorHandler(err);
    }
}