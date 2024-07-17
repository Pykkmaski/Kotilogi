'use server';

import { properties } from 'kotilogi-app/utils/properties';
import { revalidatePath } from 'next/cache';
import db from 'kotilogi-app/dbconfig';
import { Files } from 'kotilogi-app/utils/files';
import jwt from 'jsonwebtoken';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import bcrypt from 'bcrypt';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { users } from 'kotilogi-app/utils/users';
import { UserType } from 'kotilogi-app/types/UserType';
import { UserError } from 'kotilogi-app/utils/classes/User';

const PATH = '/dashboard/properties';

export async function addProperty(property: Kotidok.PropertyType) {
  const session = (await getServerSession(options as any)) as { user: UserType };
  const propertyData = await properties.addProperty({
    ...property,
    refId: session.user.email,
  });
  revalidatePath(PATH);
  return propertyData;
}

export async function getFirstPropertyOfUser(email: string) {
  return await new DatabaseTable('properties')
    .get({ refId: email })
    .orderBy('createdAt', 'asc')
    .first();
}

export async function updateProperty(propertyId: string, newPropertyData: Kotidok.PropertyType) {
  await properties.updateProperty(propertyId, newPropertyData);
  revalidatePath(PATH);
}

export async function deleteProperty(
  propertyId: string,
  password: string
): Promise<'success' | 'invalid_password'> {
  try {
    const session = (await getServerSession(options as any)) as { user: UserType };
    const passwordOk = await users.verifyCredentials(session.user.email, password);
    if (!passwordOk) {
      throw new Error('invalid_password');
    }
    await properties.deleteProperty(propertyId);
    revalidatePath(PATH);
    return 'success';
  } catch (err) {
    const msg = err.message;
    if (msg === 'invalid_password') {
      return msg;
    } else {
      console.log(msg);
      throw err;
    }
  }
}

export async function deleteFile(id: string) {
  const trx = await db.transaction();
  const fileTable = new Files('propertyFiles', trx);

  try {
    await fileTable.deleteFile(id);
    await trx.commit();
    revalidatePath('/properties/[property_id]/');
  } catch (err) {
    await fileTable.rollbackFiles();
    await trx.rollback();
  }
}

export async function getPropertyByToken(token: string) {
  return undefined;
}

/**Creates a transfer token containing information on whom the property is coming from, to whom it is intended, and the id of the property. */
export async function ACreateTransferToken(to: string, propertyId: string, password: string) {
  const session = (await getServerSession(options as any)) as any;
  if (!session) return -1;

  const [{ password: encryptedPassword }] = await db('users')
    .where({ email: session.user.email })
    .select('password');
  const passwordOk = await bcrypt.compare(password, encryptedPassword);

  if (!passwordOk) {
    return UserError.PASSWORD_MISMATCH;
  }

  return jwt.sign({ from: session.user.email, to, propertyId }, process.env.TRANSFER_SECRET);
}
