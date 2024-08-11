'use server';

import db from 'kotilogi-app/dbconfig';
import { createAppartment, updateAppartment } from 'kotilogi-app/models/appartmentData';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { createObject, deleteObject, updateObject } from 'kotilogi-app/models/objectData';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { createProperty, updateProperty } from 'kotilogi-app/models/propertyData';
import { getRefTableContent } from './util/getRefTableContent';

const path = '/dashboard/properties';

export async function ACreateProperty<T extends PropertyDataType>(
  data: T & Required<Pick<T, 'propertyTypeId'>>
) {
  const propertyTypeIds = await getRefTableContent('ref_propertyTypes');

  if (data.propertyTypeId == propertyTypeIds['Kiinteistö']) {
    await createProperty(data, async (obj, trx) => {
      const insertObj = filterValidColumns(data, await getTableColumns('data_houses', trx));

      await trx('data_houses').insert({
        id: obj.id,
        ...insertObj,
      });
    });
  } else if (data.propertyTypeId == propertyTypeIds['Huoneisto']) {
    await createAppartment(data);
  } else {
    throw new Error(`A property type of ${data.propertyTypeId} is not recognized!`);
  }

  revalidatePath(path);
  return 0;
}

export async function AUpdateProperty<T extends PropertyDataType>(
  data: Required<Pick<T, 'propertyTypeId'>> & Required<Pick<T, 'id'>>
) {
  const propertyTypeIds = await getRefTableContent('ref_propertyTypes');
  if (data.propertyTypeId == propertyTypeIds['Kiinteistö']) {
    await updateProperty(data, async trx => {
      const io = filterValidColumns(data, await getTableColumns('data_houses', trx));
      await trx('data_houses').where({ id: data.id }).update(io);
    });
  } else if (data.propertyTypeId == propertyTypeIds['Huoneisto']) {
    await updateProperty(data, async trx => {
      const io = filterValidColumns(data, await getTableColumns('data_appartments', trx));
      await trx('data_appartments').where({ id: data.id }).update(io);
    });
  } else {
    throw new Error(`A property type of ${data.propertyTypeId} is not recognized!`);
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

  if (!(await bcrypt.compare(password, encryptedPassword))) return -1;

  await deleteObject(id);
  revalidatePath(path);
  return 0;
}
