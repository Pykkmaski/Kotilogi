'use server';

import db from 'kotilogi-app/dbconfig';
import { createAppartment, updateAppartment } from 'kotilogi-app/models/appartmentData';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { createHouse, updateHouse } from 'kotilogi-app/models/houseData';
import { deleteObject, updateObject } from 'kotilogi-app/models/objectData';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { updateProperty } from 'kotilogi-app/models/propertyData';

const path = '/dashboard/properties';

export async function ACreateProperty<T extends PropertyDataType>(
  data: Required<Pick<T, 'propertyType'>>
) {
  if (data.propertyType == PropertyType.HOUSE) {
    await createHouse(data);
  } else if (data.propertyType == PropertyType.APT) {
    await createAppartment(data);
  } else {
    throw new Error(`A property type of ${data.propertyType} is not recognized!`);
  }

  revalidatePath(path);
  return 0;
}

export async function AUpdateProperty<T extends PropertyDataType>(
  data: Required<Pick<T, 'propertyType'>> & Required<Pick<T, 'id'>>
) {
  if (data.propertyType == PropertyType.HOUSE) {
    await updateProperty(data, async trx => {
      const io = filterValidColumns(data, await getTableColumns('data_houses', trx));
      await trx('data_houses').where({ id: data.id }).update(io);
    });
  } else if (data.propertyType == PropertyType.APT) {
    await updateProperty(data, async trx => {
      const io = filterValidColumns(data, await getTableColumns('data_appartments', trx));
      await trx('data_appartments').where({ id: data.id }).update(io);
    });
  } else {
    throw new Error(`A property type of ${data.propertyType} is not recognized!`);
  }

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
  console.log(encryptedPassword, password);
  if (!(await bcrypt.compare(password, encryptedPassword))) return -1;

  await deleteObject(id);
  revalidatePath(path);
  return 0;
}
