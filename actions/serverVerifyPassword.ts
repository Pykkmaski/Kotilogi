import db from "kotilogi-app/dbconfig";

export default async function serverVerifyPassword(password: string, email: string): Promise<boolean>{
    try{
        const dbPassword = await db('users').where({email}).select('password').first();
        
    }
}