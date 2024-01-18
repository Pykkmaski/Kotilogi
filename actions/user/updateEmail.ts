'use server';

import db from "kotilogi-app/dbconfig";
import jwt from 'jsonwebtoken';
import { sendHTMLEmail } from "../email/sendHTMLEmail";
import { sendEmail } from "../email/sendEmail";
import { revalidatePath } from "next/cache";

export async function updateEmail(email: string, newEmail: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db('users').where({email}).update({
                email: newEmail,
            });

            revalidatePath('/dashboard');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

/**Creates a JWT token encoding the new password, to be sent to the current email of the user. 
 * @param newEmail
*/

function createEmailResetJWT(newEmail: string){
    const encodingSecret = process.env.PASSWORD_RESET_SECRET;
    if(!encodingSecret) throw new Error('createEmailResetJWT: PASSWORD_RESET_SECRET not present in environment variables!');

    const token = jwt.sign(newEmail, encodingSecret);
    return token;
}

/**Sends a link containing a JWT with the new email address, leading to a page resetting the password of the user.*/
export async function sendEmailResetEmail(currentEmail: string, newEmail: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const token = createEmailResetJWT(newEmail);
            const emailContent = `
                ${process.env.SERVICE_DOMAIN}/resetEmail?token=${token}
            `;

            await sendHTMLEmail('Sähköpostiosoitteen vaihto', process.env.SERVICE_EMAIL_ADDRESS || 'Kotilogi', currentEmail, emailContent);
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

