'use server';

import { users } from 'kotilogi-app/utils/users';
import { revalidatePath } from 'next/cache';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../email/sendEmail';
import { sendEmailResetLink } from '../email';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { updateUser } from 'kotilogi-app/models/userData';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import bcrypt from 'bcrypt';

export async function updateUserEmail(oldEmail: string, newEmail: string) {
  //Should send an email to the current address containing a link with a token, which when visited, triggers the change of the email.
  await sendEmailResetLink({ oldEmail, newEmail });
}

export async function AUpdatePassword(oldPassword: string, newPassword: string) {
  const session = await loadSession();
  const [encrypted] = await db('userData').where({ id: session.user.id }).pluck('password');
  if (!(await bcrypt.compare(oldPassword, encrypted))) return -1;

  await updateUser({ password: newPassword });
  return 0;
}

export async function registerUser(credentials: { email: string; password: string; plan: string }) {
  return await users.registerUser(credentials);
}
