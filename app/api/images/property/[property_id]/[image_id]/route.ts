import db from "kotilogi-app/dbconfig";
import routeErrorHandler from "kotilogi-app/utils/routeErrorHandler";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}){
    try{
        const {image_id} = params;
        await db('property_images').where({id: image_id}).del()
        return new NextResponse(null, {
            status: 201,
            statusText: 'Image deleted successfully!'
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}

export async function PUT(req, {params}){
    try{
        const {image_id} = params;
        const image = await req.json();

        await db('property_images').where({id: image_id}).update(image);
        return new NextResponse(null, {
            status: 201,
            statusText: 'Image updated successfully!'
        });
    }
    catch(err){
        return routeErrorHandler(err);
    }
}