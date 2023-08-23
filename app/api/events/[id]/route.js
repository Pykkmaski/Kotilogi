import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const id = params.id;
        const event = await db('property_events').where({id}).first();
        if(!event) return new NextResponse('Event not found!', {status: 404});

        return new NextResponse(JSON.stringify(event), {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {stauts: 500});
    }
}