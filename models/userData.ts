import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export async function createUser(data: TODO) {
  await db('userData').insert({
    email: data.email,
    password: await bcrypt.hash(data.password, 15),
  });
}

export async function updateUser(data: TODO) {
  const session = await loadSession();
  await db('userData').where({ id: session.user.id }).update(data);
}
