import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try{    
        const {property_id} = params;
        const property = await db('properties').where({id: property_id}).first();
        return new NextResponse(JSON.stringify(property), {status: 200});
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function POST(request, {params}){
    try{
        const {email} = params;
        const property = await request.json();

        await db('properties').insert({
            ...property,
            owner: email,
        });

        return new NextResponse(null, {
            status: 201,
            statusText: 'Property created successfully!',
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function DELETE(request, {params}){
    try{
        const {property_id, email} = params;
        await db('properties').where({id: property_id, owner: email}).del();
        return new NextResponse(null, {
            status: 200,
            statusText: `Property ${property_id} deleted successfully!`,
        })
    }   
    catch(err){
        return routeErrorHandler(err);
    }
}