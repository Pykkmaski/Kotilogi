import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const {id} = request.params;
        const property = await db('properties').where({id}).first();
        return new NextResponse(property, {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}

export async function PUT(request){
    try{
        const {id} = request.params();
        const updatedData = await request.json();
        await db('properties').where({id}).update(updatedData);
        return new NextResponse(null, {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}

export async function DELETE(request, {params}){
    try{
        const {id} = params;
        const deletedId = await db('properties').where({id}).del();
        return new NextResponse(deletedId, {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}