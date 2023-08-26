import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const {property_id} = params;
        const images = await db('property_images').where({property_id});
        return new NextResponse(JSON.stringify(images), {
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
        const image = await req.json();
        await db('property_images').insert({
            ...image,
            property_id,
        })
        return new NextResponse(null, {
            status: 201,
            statusText: 'Image posted successfully!'
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}