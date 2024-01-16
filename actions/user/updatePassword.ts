'use server';

import db from "kotilogi-app/dbconfig";
import { verifyPassword } from "./util/verifyPassword";
import bcrypt from 'bcrypt';

export async function updatePassword(email: string, newPassword: string, currentPassword: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const isCorrectPassword = await verifyPassword(email, currentPassword);
            if(!isCorrectPassword) throw new Error('invalid_password');

            const encryptedPassword = await bcrypt.hash(newPassword, 15);
            await db('users').where({email}).update({
                password: encryptedPassword,
            });
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}