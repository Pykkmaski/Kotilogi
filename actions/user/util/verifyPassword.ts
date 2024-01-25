import db from "kotilogi-app/dbconfig";
import bcrypt from 'bcrypt';
import { logError } from "kotilogi-app/utils/logError";

export async function verifyPassword(email: string, password: string){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const [user] = await db('users').where({email}).select('password');
            const isOk = await bcrypt.compare(password, user.password);
            resolve(isOk);
        }
        catch(err){
            logError(err);
            reject(err);
        }
    });
}