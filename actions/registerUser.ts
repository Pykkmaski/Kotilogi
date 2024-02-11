'use server';

import bcrypt from 'bcrypt';
import db from '@/dbconfig';
import { RegisterError } from 'kotilogi-app/utils/error';

type RegisterStatusType = 'success' | 'user_exists';

/**
 * Adds a new user to the database.
 * @param credentials An object containing the email and password for the new user.
 * @returns
 */

export async function registerUser(credentials: {email: string, password: string, plan: string}){
    return new Promise<RegisterStatusType>(async (resolve, reject) => {
        try{
            const user = {
                email: credentials.email,
                password: await bcrypt.hash(credentials.password, 15),
                plan: credentials.plan,
            }
    
            await db('users').insert(user);
            return resolve('success');
        }
        catch(err: any){
            console.log(err.message);
            const msg = err.message.toUpperCase();

            if(msg.includes('UNIQUE') || msg.includes('DUPLICATE')){
                return resolve('user_exists');
            }
            else{
                return reject(err);
            } 
        }
    });
}