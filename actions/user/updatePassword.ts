'use server';

import db from 'kotilogi-app/dbconfig';
import { verifyPassword } from './util/verifyPassword';
import bcrypt from 'bcrypt';

export async function updatePassword(email: string, newPassword: string, currentPassword: string) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const isCorrectPassword = await verifyPassword(email, currentPassword);
      if (!isCorrectPassword) return resolve('invalid_password');

      const encryptedPassword = await bcrypt.hash(newPassword, 15);
      await db('users').where({ email }).update({
        password: encryptedPassword,
      });

      return resolve('success');
    } catch (err) {
      reject(err);
    }
  });
}
