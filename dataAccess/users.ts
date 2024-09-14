import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { hashPassword } from './utils/hashPassword';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export async function verifyPassword(userId: string, password: string) {
  const [data] = await db('data_users').where({ id: userId }).select('password');

  if (!data) {
    throw new Error(`Password for user ${userId} missing from the db!`);
  }

  const { password: encrypted } = data;

  const passwordOk = await bcrypt.compare(password, encrypted);
  if (!passwordOk) {
    throw new Error('Salasana on virheellinen!');
  }
}

export async function createUser(data: TODO) {
  await db('data_users').insert({
    email: data.email,
    password: await hashPassword(data.password),
    status: 0,
  });
}

/**Updates the currently logged in user. */
export async function updateUser(data: TODO) {
  const session = await verifySession();
  await db('data_users')
    .where({ id: session.user.id })
    .update({
      ...data,
      password: data.password && (await hashPassword(data.password)),
    });
}

export async function deleteUser(id: string) {
  const [user] = await db('data_users').where({ id }).select('status', 'createdAt');
  if (!user) {
    throw new Error(`User ${id} does not exist!`);
  }

  if (user.status !== 0) {
    //Not unconfirmed
    throw new Error(
      `The user is active. Only they themselves can delete their account! (id: ${id})`
    );
  }

  const session = await verifySession();
  if (session.user.id !== id) {
    throw new Error(`Only the user themselves can delete their account! (id: ${id}`);
  }

  await db('data_users').where({ id }).del();
}
