import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

async function getUser(email : string){
    return await db('users').where({email}).first();
}

export async function POST(request){
    try{
        const data : {password: string, email: string} = await request.json();
        const {password} = data;

        data.password = await bcrypt.hash(password, 15);

        await db('users').insert({
            ...data,
            first_name: 'unused',
            last_name: 'unused',
            active: 0,
        });

        return new Response(null, {status: 201});
    }
    catch(err){
        console.log(err.message);
        const regex = new RegExp(err.message);
        if(regex.test('UNIQUE constraint failed')) return new NextResponse('invalid_user', {status: 406});
        
        return new Response(err.message, {status: 500});    
    }
}