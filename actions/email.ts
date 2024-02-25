'use server';
import jwt from 'jsonwebtoken';
import { sendEmail } from './email/sendEmail';

/**Sends an activation link to the specified email address. */
export async function sendAccountActivationLink(email: string){
    const activationToken = jwt.sign(email, process.env.ACTIVATION_SECRET);
    const activationLink = `${process.env.SERVICE_DOMAIN}/api/activate/${activationToken}`;
    await sendEmail('Tilin aktivointilinkki', 'Kotidok', email, activationLink);
}