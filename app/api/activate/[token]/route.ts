import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import db from "kotilogi-app/dbconfig";
import { signOut } from "next-auth/react";

export async function GET(req: NextRequest, {params}){
    try{
        if(!params.token){
            return new NextResponse('Token not found!', {
                status: 404,
            });
        }
        
        const activationSecret = process.env.ACTIVATION_SECRET;
        console.log(activationSecret);

        const emailToActivate = jwt.verify(params.token, activationSecret, (err, decoded) => {
            if(err){
                console.log(err.message);
                //Return response on invalid token.
            }
            else{
                return decoded;
            }
        });
        
        console.log(emailToActivate);
        const [{status: userStatus}] = await db('users').where({email: emailToActivate}).select('status');
    
        if(userStatus !== 'unconfirmed'){
            return new NextResponse('User already activated!', {
                status: 409,
            });
        }
    
        await db('users').where({email: emailToActivate}).update({
            status: 'active',
        });
    

        return NextResponse.redirect(`${process.env.SERVICE_DOMAIN}/logout`, {
            status: 303,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse('Palvelinvirhe', {
            status: 500,
        });
    }
    
}