import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

const propertiesTableName = 'properties';

export async function GET(req: Request){
    try{
        const {propertyId} = await req.json();
        const property = await db(propertiesTableName).where({id: propertyId}).first();
        if(!property) return new NextResponse(null, {
            status: 404,
            statusText: 'Property with id ' + propertyId + ' not found!',
        });

        return new NextResponse(property, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: err.message,
        });
    }
}

export async function POST(req: Request){
    try{
        const {data} = await req.json();
        await db(propertiesTableName).insert(data);
        return new NextResponse(null, {
            status: 200,
            statusText: 'Property added succesfully!',
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: err.message,
        });
    }
}

export async function PUT(req: Request){
    try{
        const {updatedPropertyData} = await req.json();
        await db(propertiesTableName).where({id: updatedPropertyData.id}).updated(updatedPropertyData);
        return new NextResponse(null, {
            status: 200,
            statusText: 'Property updated succesfully!',
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: err.message,
        });
    }
}

export async function DELETE(req: Request){
    try{
        const {propertyId} = await req.json();
        await db(propertiesTableName).where({id: propertyId}).del();
        return new NextResponse(null, {
            status: 200,
            statusText: 'Property deleted succesfully!',
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: err.message,
        });
    }
}