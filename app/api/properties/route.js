import { NextResponse } from "next/server";
import db from 'kotilogi-app/dbconfig';

export async function GET(request){
    try{
        const properties = await db('properties');
        return new NextResponse(JSON.stringify(properties), {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}

export async function POST(request){
    try{
        const property = await request.json();
        const insertedProperties = await db('properties').insert(property, ['address', 'description', 'id']);
        const newProperty = insertedProperties.at(0);
        return new NextResponse(JSON.stringify(newProperty), {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}