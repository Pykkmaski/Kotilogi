'use server';

import { properties } from 'kotilogi-app/utils/properties';
import { revalidatePath } from 'next/cache';
import { checkUserPassword } from '../util/checkUserPassword';
import db from 'kotilogi-app/dbconfig';
import { Files } from 'kotilogi-app/utils/files';
import jwt from 'jsonwebtoken';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import bcrypt from 'bcrypt';

const PATH = '/dashboard/properties';

export async function addProperty(property: Kotilogi.PropertyType, files?: FormData[]) {
  await properties.addProperty(property, files?.map(file => file.get('file') as unknown as File) || []);
  revalidatePath(PATH);
}

export async function updateProperty(propertyId: string, newPropertyData: Kotilogi.PropertyType) {
  await properties.updateProperty(propertyId, newPropertyData);
  revalidatePath(PATH);
}

export async function deleteProperty(propertyId: string) {
  await properties.deleteProperty(propertyId);
  revalidatePath(PATH);
}

export async function activateProperty(data: { customer: string; password: string; propertyId: string }) {
  await checkUserPassword(data.customer, data.password).then(result => {
    if (!result) throw new Error('Incorrect password!');
  });

  await properties.activateProperty(data.propertyId);
  revalidatePath(PATH);
}

export async function deactivateProperty(property: Kotilogi.PropertyType, password: string) {
  await checkUserPassword(property.refId, password).then(result => {
    if (!result) {
      throw new Error('Invalid password');
    }
  });

  await properties.deactivateProperty(property.id);
  revalidatePath(PATH);
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

export async function createTransferToken(from: string, to: string, propertyId: string, password: string) {
  const usersTable = new DatabaseTable('users');
  const [{ password: encryptedPassword }] = usersTable.select('password', { email: from });

  const passwordOk = await bcrypt.compare(password, encryptedPassword);
  if (!passwordOk) {
    throw new Error('invalid_password');
  }

  return jwt.sign({ from, to, propertyId }, process.env.TRANSFER_SECRET);
}

export async function transferOwnership(token: string) {
  const data = jwt.verify(token, process.env.TRANSFER_SECRET) as jwt.JwtPayload;
  const propertiesTable = new DatabaseTable('properties');
  await propertiesTable.update({ refId: data.newOwner }, { id: data.propertyId });
  return await propertiesTable.get({ id: data.propertyId });
}

export async function getPropertyWithToken(token: string) {
  const table = new DatabaseTable('properties');
  const payload = jwt.verify(token, process.env.TRANSFER_SECRET) as jwt.JwtPayload;
  return await table.get({ id: payload.propertyId });
}
