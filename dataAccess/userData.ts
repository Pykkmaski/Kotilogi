import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export async function createUser(data: TODO) {
  await db('data_users').insert({
    email: data.email,
    password: await bcrypt.hash(data.password, 15),
  });
}

export async function updateUser(data: TODO) {
  const session = await loadSession();
  await db('data_users').where({ id: session.user.id }).update(data);
}
