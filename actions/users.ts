'use server';

import { sendAccountActivationLink } from '../app/api/_lib/sendAccountActivationLink';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import bcrypt from 'bcrypt';
import { signIn, signOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';

export async function AUpdateEmail(oldEmail: string, newEmail: string) {
  //Should send an email to the current address containing a link with a token, which when visited, triggers the change of the email.
  //await sendEmailResetLink({ oldEmail, newEmail });
}

export async function AUpdatePassword(oldPassword: string, newPassword: string) {
  const session = await loadSession();
  const [encrypted] = await db('userData').where({ id: session.user.id }).pluck('password');
  if (!(await bcrypt.compare(oldPassword, encrypted))) return -1;

  await db('data_users')
    .where({ id: session.user.id })
    .update({
      password: await bcrypt.hash(newPassword, 15),
    });

  return 0;
}

export async function ARegisterUser(credentials: {
  email: string;
  password: string;
  plan: string;
}) {
  const trx = await db.transaction();

  try {
    const user = {
      email: credentials.email,
      password: await bcrypt.hash(credentials.password, 15),
    };

    await trx('data_users').insert(user);
    await sendAccountActivationLink(user.email);
    await trx.commit();
    return {
      status: 200,
      statusText: 'Käyttäjä rekisteröity!',
    };
  } catch (err) {
    const msg = err.message.toUpperCase();
    await trx.rollback();
    if (msg.includes('UNIQUE') || msg.includes('DUPLICATE')) {
      return {
        status: 409,
        statusText: 'Käyttäjä on jo olemassa!',
      };
    } else {
      console.log(err.message);
      return {
        status: 500,
        statusText: err.message,
      };
    }
  }
}

export async function ALoginUser(credentials: { email: string; password: string }) {
  const res = await signIn('credentials', credentials);
  revalidatePath('/');
  return res;
}

export async function ALogoutUser() {
  const res = await signOut({
    redirect: false,
  });
  revalidatePath('/');
  return res;
}
