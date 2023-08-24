import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const {property_id} = params;
        const events = await db('property_events').where({property_id});
        return new NextResponse(JSON.stringify(events), {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {status: 500});
    }
}