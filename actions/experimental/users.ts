'use server';

import { users } from 'kotilogi-app/utils/users';
import { revalidatePath } from 'next/cache';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../email/sendEmail';
import { sendEmailResetLink } from '../email';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { User, UserError } from 'kotilogi-app/utils/classes/User';

export async function updateUserEmail(oldEmail: string, newEmail: string) {
  //Should send an email to the current address containing a link with a token, which when visited, triggers the change of the email.
  await sendEmailResetLink({ oldEmail, newEmail });
}

export async function AUpdatePassword(oldPassword: string, newPassword: string) {
  const session = (await getServerSession(options as any)) as any;
  const user = await User.loadUser(session.user.email);
  if (!user) return UserError.NOT_FOUND;

  const result = await user.updatePassword(oldPassword, newPassword);
  if (result === 0) {
    await User.saveUser(user);
  }
  return result;
}

export async function registerUser(credentials: { email: string; password: string; plan: string }) {
  return await users.registerUser(credentials);
}
