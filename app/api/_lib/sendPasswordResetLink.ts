import { sendEmail } from './sendEmail';
import jwt from 'jsonwebtoken';

export async function sendEmailResetLink(payload: { oldEmail: string; newEmail: string }) {
  const token = jwt.sign(payload, process.env.EMAIL_RESET_SECRET);
  const resetLink = `${process.env.SERVICE_DOAMIN}/api/users/reset_email?token=${token}`;
  await sendEmail('Sähköpostiosoitteen vaihto', 'Kotidok', payload.oldEmail, resetLink);
}
