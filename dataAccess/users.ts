import db from 'kotilogi-app/dbconfig';
import { hashPassword } from './utils/hashPassword';
import bcrypt from 'bcrypt';
import { verifySession } from 'kotilogi-app/utils/verifySession';

class Users {
  async verifyPassword(userId: string, password: string) {
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

  async create(data: TODO) {
    await db('data_users').insert({
      email: data.email,
      password: await hashPassword(data.password),
      status: 0,
    });
  }

  /**Updates the currently logged in user. */
  async update(data: TODO) {
    const session = await verifySession();
    await db('data_users')
      .where({ id: session.user.id })
      .update({
        ...data,
        password: data.password && (await hashPassword(data.password)),
      });
  }

  async del(id: string, password: string) {
    const [user] = await db('data_users').where({ id }).select('status', 'createdAt');
    if (!user) {
      throw new Error(`User ${id} does not exist!`);
    }

    this.verifyPassword(id, password);

    const session = await verifySession();
    if (session.user.id !== id) {
      throw new Error(`Only the user themselves can delete their account! (id: ${id}`);
    }

    await db('data_users').where({ id }).del();
  }
}

export const users = new Users();
