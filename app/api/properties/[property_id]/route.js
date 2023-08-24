import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try{
        const {property_id} = params;
        const property = await db('properties').where({id: property_id}).first();
        return new NextResponse(JSON.stringify(property), {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}

export async function PUT(request){
    try{
        const {property_id} = request.params();
        const updatedData = await request.json();
        await db('properties').where({id: property_id}).update(updatedData);
        return new NextResponse(null, {status: 201});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}

export async function DELETE(request, {params}){
    try{
        const {property_id} = params;
        const deletedId = await db('properties').where({id: property_id}).del();
        return new NextResponse(deletedId, {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}