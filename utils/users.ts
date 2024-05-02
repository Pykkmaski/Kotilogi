import db from 'kotilogi-app/dbconfig';
import { Files } from './files';
import bcrypt from 'bcrypt';
import { DatabaseTable } from './databaseTable';
import { RegisterStatusType } from 'kotilogi-app/app/(blackHeader)/register/useRegister';
import { sendAccountActivationLink } from 'kotilogi-app/actions/email';

class Users {
  async verifyCredentials(email: string, password: string) {
    const [{ password: encryptedPassword }] = await db('users').where({ email }).select('password');
    return await bcrypt.compare(password, encryptedPassword);
  }

  async updatePassword(email: string, oldPassword: string, newPassword: string) {
    try {
      const usersTable = new DatabaseTable('users');

      const [{ password: encryptedPassword }] = await usersTable.select('password', {
        email,
      });
      const ok = await bcrypt.compare(oldPassword, encryptedPassword);
      if (!ok) {
        throw new Error('invalid_password');
      }

      await usersTable.update(
        {
          password: await bcrypt.hash(newPassword, 15),
        },
        { email }
      );

      return 'success';
    } catch (err) {
      if (err.message === 'invalid_password') {
        return 'invalid_password';
      } else {
        console.log(err.message);
        return 'unexpected';
      }
    }
  }

  async updateEmail(email: string, newEmail: string) {
    const usersTable = new DatabaseTable('users');
    await usersTable.update(
      {
        email: newEmail,
      },
      { email }
    );
  }

  async registerUser(credentials: { email: string; password: string; plan: string }) {
    const trx = await db.transaction();
    const usersTable = new DatabaseTable('users', trx);
    try {
      const user = {
        email: credentials.email,
        password: await bcrypt.hash(credentials.password, 15),
        plan: credentials.plan,
      };

      await usersTable.add(user);
      await sendAccountActivationLink(user.email);
      await trx.commit();
      return 'success';
    } catch (err) {
      const msg = err.message.toUpperCase();
      await trx.rollback();
      if (msg.includes('UNIQUE') || msg.includes('DUPLICATE')) {
        return 'user_exists';
      } else {
        console.log(err.message);
        return 'unexpected';
      }
    }
  }

  /**Returns the number of properties a user has. */
  async getPropertyCount(email: string) {
    const [{ count }] = (await db('properties')
      .where({ refId: email })
      .count('*', { as: 'count' })) as [{ count: number }];
    return count;
  }

  async deleteUser(email: string) {
    const trx = await db.transaction();
    const usersTable = new DatabaseTable('users', trx);

    //Deletes all properties, their events, usage data and file info from the db, but not bills.
    await usersTable.del({ email });

    await Files.removeUnpaired();
  }
}

export const users = new Users();
