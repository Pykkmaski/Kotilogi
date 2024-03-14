import db from "kotilogi-app/dbconfig";
import { NextResponse } from "next/server";

const TABLENAME = 'properties';

export async function GET(req: Request){
    try{
        const id = new URL(req.url).searchParams.get('id');
        const [property] = await db(TABLENAME).where({id});
        return new NextResponse(JSON.stringify(property));
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
            statusText: err.message,
        });
    }
}