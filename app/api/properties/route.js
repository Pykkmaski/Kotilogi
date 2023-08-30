import { NextResponse } from "next/server";
import db from 'kotilogi-app/dbconfig';
import { getServerSession } from "next-auth";

export async function GET(request){
    try{
        const session = await getServerSession();
        if(session && session.user){
            const properties = await db('properties').where({owner: session.user.email});
            return new NextResponse(JSON.stringify(properties), {
                status: 200
            });
        }
        else {
           return new NextResponse(null, {
            status: 401,
            statusText: 'Unauthorized to fetch properties',
           });
        }
        
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