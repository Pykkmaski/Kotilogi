'use server';

import db from "kotilogi-app/dbconfig";

export async function updateEmail(email: string, newEmail: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db('users').where({email}).update({
                email: newEmail,
            });

            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}