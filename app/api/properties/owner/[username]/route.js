import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const {username} = context.params;
        const properties = await db('properties').where({owner: username});
        return new NextResponse(JSON.stringify(properties), {status: 200});
    }
    catch(err){
        return new NextResponse(err.message, {status: 500});
    }
}