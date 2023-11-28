'use server';

import bcrypt from 'bcrypt';
import { ErrorCode } from 'kotilogi-app/constants';
import db from 'kotilogi-app/dbconfig';

/**
 * Adds a new user to the database.
 * @param {{email: string, password: string}} credentials An object containing the email and password for the new user.
 * @returns {Promise<Kotilogi.Error>} Resolves to a custom Error-object containing a code and an error message.
 */

export default async function registerUser(credentials: {email: string, password: string, plan: string}): Promise<Kotilogi.Error>{
    try{
        const user = {
            email: credentials.email,
            password: await bcrypt.hash(credentials.password, 15),
            plan: credentials.plan,
        }

        await db('users').insert(user);
        return {
            message: null,
            code: ErrorCode.SUCCESS,
        }
    }
    catch(err){
        const message = err.message;

        if(message.includes('UNIQUE')){
            return {
                message: `Account with email ${credentials.email} already exists!`,
                code: ErrorCode.INVALID_USER,
            }
        }

        return {
            message: null,
            code: ErrorCode.UNEXPECTED,
        }
    }
}