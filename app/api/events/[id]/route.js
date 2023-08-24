import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const {id} = params;
        const event = await db('property_events').where({id}).first();
        if(!event) return new NextResponse(null, {
            status: 404,
            statusText: `Event with id ${id} not found!`,
        });

        return new NextResponse(JSON.stringify(event), {status: 200});
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function PUT(request, {params}){
    try{
        const {id} = params;
        const updatedEvent = await request.json();
        const updatedIds = await db('property_events').where({id}).update(updatedEvent, 'id');
        return new NextResponse(updatedIds.at(0).id, {
            status: 200,
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function DELETE(request, {params}){
    try{
        const {id} = params;
        const deletedIds = await db('property_events').where({id}).del('id');
        return new NextResponse(deletedIds.at(0).id, {
            status: 200,
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}