import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try{
        const {property_id} = params;
        
        const events = await db('property_events').where({property_id});

        if(!events) return new NextResponse(null, {
            status: 404,
            statusText: `Events for property ${property_id} not found!`,
        });

        return new NextResponse(JSON.stringify(events), {
            status: 200,
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}