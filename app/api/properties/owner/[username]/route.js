import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try{
        const {username} = params;
        const properties = await db('properties').where({owner: username});
        return new NextResponse(JSON.stringify(properties), {status: 200});
    }
    catch(err){
        return new NextResponse(err.message, {status: 500});
    }
}

export async function POST(request, {params}){
    try{
        const {username} = params;
        const property = await request.json();

        await db('properties').insert({
            ...property,
            owner: username,
        });

        return new NextResponse(null, {
            statusText: 'Property created successfully!',
            status: 201
        });
    }
    catch(err){
        return new NextResponse(err.message, {status: 500});
    }
}