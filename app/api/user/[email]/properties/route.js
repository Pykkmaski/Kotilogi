import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import {NextResponse } from "next/server";

export async function GET(request, {params}){
    try{
        const {email} = params;
        const properties = await db('properties').where({owner: email});
        return new NextResponse(JSON.stringify(properties), {status: 200});
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function POST(request, {params}){
    try{
        const propertyData = await request.json();
        const {email} = params;
        const insertedIds = await db('properties').insert({
            ...propertyData,
            owner: email,
        }, 'id');

        return new NextResponse(insertedIds.at(0).id, {
            status: 201,
            statusText: 'Property added successfully!',
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}