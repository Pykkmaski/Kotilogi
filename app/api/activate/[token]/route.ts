import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import db from "kotilogi-app/dbconfig";

export async function GET(req: NextRequest, {params}){
    try{
        if(!params.token){
            throw new Error('token_not_found');
        }
        
        const activationSecret = process.env.ACTIVATION_SECRET;
        console.log(activationSecret);

        const emailToActivate = jwt.verify(params.token, activationSecret, (err, decoded) => {
            if(err){
                console.log(err.message);
                //Throw error on invalid token.
                throw new Error('token_invalid');
            }
            else{
                return decoded;
            }
        });
        
        console.log(emailToActivate);
        const [{status: userStatus}] = await db('users').where({email: emailToActivate}).select('status');
    
        if(userStatus !== 'unconfirmed'){
            throw new Error('user_activated');
        }
    
        await db('users').where({email: emailToActivate}).update({
            status: 'active',
            activatedOn: Date.now(),
        });
    
        return NextResponse.redirect(`${process.env.SERVICE_DOMAIN}/logout`, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        if(err.message === 'invalid_token'){
            return new NextResponse(null, {
                status: 403,
            });
        }
        else if(err.message === 'user_activated'){
            return new NextResponse(null, {
                status: 409,
            });
        }
        else if(err.message === 'token_not_found'){
            return new NextResponse(null, {
                status: 400,
            });
        }
        else{
            return new NextResponse('Palvelinvirhe. Yritä myöhemmin uudelleen.', {
                status: 500,
            });
        }
        
    }
    
}