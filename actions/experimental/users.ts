'use server';

import { users } from 'kotilogi-app/utils/users';
import { revalidatePath } from 'next/cache';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../email/sendEmail';
import { sendEmailResetLink } from '../email';

export async function updateUserEmail(oldEmail: string, newEmail: string) {
  //Should send an email to the current address containing a link with a token, which when visited, triggers the change of the email.
  await sendEmailResetLink({ oldEmail, newEmail });
}

export async function updateUserPassword(email: string, oldPassword: string, newPassword: string) {
  const result = await users.updatePassword(email, oldPassword, newPassword);
  return result;
}

export async function registerUser(credentials: { email: string; password: string; plan: string }) {
  return await users.registerUser(credentials);
}
