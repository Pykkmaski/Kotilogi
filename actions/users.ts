'use server';

import { MaxProperties } from 'kotilogi-app/constants';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { sendAccountActivationLink } from './email';
import { signOut as authSignOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';

/**Verifies a users password. */
async function verifyPassword(email: string, password: string) {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const [user] = await db('users').where({ email }).select('password');
      const isOk = await bcrypt.compare(password, user.password);
      resolve(isOk);
    } catch (err) {
      reject(err);
    }
  });
}

/**Updates a user's password */
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

export async function del(email: string) {
  const trx = await db.transaction();
  let rollbackFileDelete: () => Promise<void> = null;

  try {
    //All property and event files must be manually deleted.
    const files = await trx('properties')
      .where({ refId: email })
      .pluck('id')
      .then(async propertyIds => {
        //Get the event files associated with events of the property:
        const eventFiles = await trx('propertyEvents')
          .whereIn('refId', propertyIds)
          .pluck('id')
          .then(async eventIds => {
            return await trx('eventFiles').whereIn('refId', eventIds).pluck('fileName');
          });

        //Get the files associated with the property:
        const propertyFiles = await trx('propertyFiles').whereIn('refId', propertyIds).pluck('fileName');

        return [...eventFiles, ...propertyFiles];
      });

    //Delete the files from disk:
    rollbackFileDelete = files.del(files);

    //Deletes the user, their properties, the events of the properties, and all file entries for both on the database.
    await trx('users').where({ email }).del();
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    if (rollbackFileDelete) {
      await rollbackFileDelete();
    }

    await trx.rollback();
  }
}

export async function isUserValid(email: string) {
  return (await db('users').where({ email })).length !== 0;
}

export async function signOut() {
  await authSignOut({
    redirect: false,
  }).then(() => revalidatePath('/'));
}
