import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const newEvent = await req.json();
        const insertedEvents = await db('property_events').insert(newEvent, '*');
        return new NextResponse(JSON.stringify(insertedEvents.at(0)), {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}