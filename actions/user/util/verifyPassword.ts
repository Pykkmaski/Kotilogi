import db from "kotilogi-app/dbconfig";
import bcrypt from 'bcrypt';

export async function verifyPassword(email: string, password: string){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const [{password: currentPassword}] = await db('users').where({email}).select('password');
            const isOk = await bcrypt.compare(password, currentPassword);
            resolve(isOk);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}