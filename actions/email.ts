'use server';
import jwt from 'jsonwebtoken';
import { sendEmail } from './email/sendEmail';
import db from 'kotilogi-app/dbconfig';

/**Sends an activation link to the specified email address. */
export async function sendAccountActivationLink(email: string) {
  const [id] = await db('data_users').where({ email }).pluck('id');
  const activationToken = jwt.sign(id, process.env.ACTIVATION_SECRET);
  const activationLink = `${process.env.SERVICE_DOMAIN}/api/public/users/activate?token=${activationToken}`;
  await sendEmail('Tilin aktivointilinkki', 'Kotidok', email, activationLink);
}

export async function sendEmailResetLink(payload: { oldEmail: string; newEmail: string }) {
  const token = jwt.sign(payload, process.env.EMAIL_RESET_SECRET);
  const resetLink = `${process.env.SERVICE_DOAMIN}/api/users/reset_email?token=${token}`;
  await sendEmail('Sähköpostiosoitteen vaihto', 'Kotidok', payload.oldEmail, resetLink);
}
