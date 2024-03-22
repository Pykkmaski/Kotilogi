import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const token = jwt.sign(body, process.env.TRANSFER_SECRET);
        return new NextResponse(token, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
}