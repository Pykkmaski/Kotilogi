'use server';

import db from 'kotilogi-app/dbconfig';
import { deleteObject } from 'kotilogi-app/models/objectData';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { createProperty, updateProperty } from 'kotilogi-app/models/propertyData';

const path = '/dashboard/properties';

export async function ACreateProperty<T extends PropertyDataType>(
  data: T & Required<Pick<T, 'propertyTypeId'>>
) {
  await createProperty(data);
  revalidatePath(path);
  return 0;
}

export async function AUpdateProperty<T extends PropertyDataType>(
  id: string,
  data: Required<Pick<T, 'propertyTypeId'>>
) {
  await updateProperty(id, data);
  revalidatePath(path);
  return 0;
}

export async function ADeleteProperty(id: string, password: string) {
  const session = await loadSession();
  const owners = await db('data_propertyOwners').where({ propertyId: id }).pluck('userId');
  if (!owners.includes(session.user.id)) return -2;

  const [encryptedPassword] = await db('data_users')
    .where({ id: session.user.id })
    .pluck('password');

  if (!(await bcrypt.compare(password, encryptedPassword))) return -1;

  await deleteObject(id);
  revalidatePath(path);
  return 0;
}
