import db from "kotilogi-app/dbconfig";
import bcrypt from 'bcrypt';

export async function checkUserPassword(customer: string, password: string){
    return await db('users').where({email: customer}).select('password').then(async ([{password: encryptedPassword}]) => {
        const passwordOk = await bcrypt.compare(password, encryptedPassword);
        if(!passwordOk){
            return false;
        }
        else{
            return true;
        }
    });
}