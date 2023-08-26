export { default } from "next-auth/middleware"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, {params}){

}

export const config = {
    matcher: ['/properties'],
}