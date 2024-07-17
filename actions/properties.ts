'use server';

import { createAppartment, updateAppartment } from 'kotilogi-app/models/appartmentData';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { createHouse, updateHouse } from 'kotilogi-app/models/houseData';
import { deleteObject } from 'kotilogi-app/models/objectData';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { revalidatePath } from 'next/cache';

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
    await updateHouse(data);
  } else if (data.propertyType == PropertyType.APT) {
    await updateAppartment(data);
  } else {
    throw new Error(`A property type of ${data.propertyType} is not recognized!`);
  }

  revalidatePath(path);
  return 0;
}

export async function ADeleteProperty(id: string) {
  await deleteObject(id);
  revalidatePath(path);
  return 0;
}
