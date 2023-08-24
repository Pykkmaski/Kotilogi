import { NextResponse } from "next/server";

export default function routeErrorHandler(err){
    const {message} = err;
    console.log(message);
    return new NextResponse(message, {status: 500});
}