'use server';

import db from 'kotilogi-app/dbconfig';
import { deleteObject } from 'kotilogi-app/dataAccess/objects';
import { PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { createProperty, updateProperty } from 'kotilogi-app/models/propertyData';
import { ServerActionResponse } from './lib/ServerActionResponse';

const path = '/dashboard/properties';

export async function ACreateProperty<T extends PropertyDataType>(
  data: T & Required<Pick<T, 'propertyTypeId'>>
) {
  try {
    await createProperty(data);
    revalidatePath(path);
    return {
      status: 200,
      statusText: 'Talo luotu!',
    };
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      statusText: err.message,
    };
  }
}

export async function AUpdateProperty<T extends PropertyDataType>(
  id: string,
  data: Required<Pick<T, 'propertyTypeId'>>
): Promise<ServerActionResponse> {
  try {
    await updateProperty(id, data);
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      statusText: err.message,
    };
  }

  revalidatePath(path);
  return {
    status: 200,
    statusText: 'Talo päivitetty!',
  };
}

export async function ADeleteProperty(id: string, password: string): Promise<ServerActionResponse> {
  try {
    const session = await loadSession();
    const owners = await db('data_propertyOwners').where({ propertyId: id }).pluck('userId');
    if (!owners.includes(session.user.id))
      return {
        status: 403,
        statusText: 'Vain talon omistaja voi poistaa sen!',
      };

    const [encryptedPassword] = await db('data_users')
      .where({ id: session.user.id })
      .pluck('password');

    if (!(await bcrypt.compare(password, encryptedPassword))) {
      return {
        status: 401,
        statusText: 'Annettu salasana on virheellinen!',
      };
    }

    await deleteObject(id);
    revalidatePath(path);
    return {
      status: 200,
      statusText: 'Talo poistettu!',
    };
  } catch (err) {
    console.log(err.message);
    return {
      status: 500,
      statusText: err.message,
    };
  }
}
