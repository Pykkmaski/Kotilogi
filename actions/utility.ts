'use server';

import db from 'kotilogi-app/dbconfig';
import { createObject, deleteObject } from 'kotilogi-app/models/objectData';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { multiplyByOneHundred } from 'kotilogi-app/models/utils/convertNumeralUnits';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { revalidatePath } from 'next/cache';
import { ServerActionResponse } from './lib/ServerActionResponse';
import { createUtilityData } from 'kotilogi-app/models/utilityData';

const path = '/newDashboard/properties/[property_id]';
const table = 'data_utilities';

export async function AGetUtilityData(query: TODO) {
  return await db(table)
    .join('data_objects', { 'data_objects.id': `${table}.id` })
    .where(query);
}

export async function ADeleteUtilityData(id: string) {
  await deleteObject(id);
  revalidatePath(path);
}

export async function AUpdateUtilityData(
  data: Required<Pick<UtilityDataType, 'id'>> & Partial<UtilityDataType>
) {
  const updateObject = filterValidColumns(data, await getTableColumns(table, db));
  const { monetaryAmount, unitAmount, time } = updateObject;

  await db(table)
    .where({ id: data.id })
    .update({
      ...updateObject,
      monetaryAmount: monetaryAmount ? multiplyByOneHundred(monetaryAmount) : undefined,
      unitAmount: unitAmount ? multiplyByOneHundred(unitAmount) : undefined,
    });
  revalidatePath(path);

  return {
    status: 200,
    statusText: 'Tieto päivitetty!',
  };
}

export async function ACreateUtilityData(
  data: (Partial<UtilityDataType> & Required<Pick<UtilityDataType, 'parentId'>>)[]
) {
  const results = await Promise.allSettled(data.map(d => createUtilityData(d)));

  let res: ServerActionResponse;
  if (results.find(result => result.status === 'rejected')) {
    res = {
      status: 206,
      statusText: 'Osaa tiedoista ei voitu tallentaa!',
    };
  } else {
    res = {
      status: 200,
      statusText: 'Tiedot tallennettu!',
    };
  }

  revalidatePath(path);
  return res;
}
