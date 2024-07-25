'use server';

import db from 'kotilogi-app/dbconfig';
import { createUtilityData } from 'kotilogi-app/models/utilityData';
import { deleteObject } from 'kotilogi-app/models/objectData';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { multiplyByOneHundred } from 'kotilogi-app/models/utils/convertNumeralUnits';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { revalidatePath } from 'next/cache';

const path = '/newDashboard/properties/[property_id]';

export async function AGetUtilityData(query: TODO) {
  return await db('utilityData')
    .join('objectData', { 'objectData.id': 'utilityData.id' })
    .where(query);
}

export async function ADeleteUtilityData(id: string) {
  await deleteObject(id);
  revalidatePath(path);
}

export async function AUpdateUtilityData(
  data: Required<Pick<UtilityDataType, 'id'>> & Partial<UtilityDataType>
) {
  const updateObject = filterValidColumns(data, await getTableColumns('utilityData', db));
  const { monetaryAmount, unitAmount, time } = updateObject;

  await db('utilityData')
    .where({ id: data.id })
    .update({
      ...updateObject,
      monetaryAmount: monetaryAmount ? multiplyByOneHundred(monetaryAmount) : undefined,
      unitAmount: unitAmount ? multiplyByOneHundred(unitAmount) : undefined,
    });
  revalidatePath(path);
}

export async function ACreateUtilityData(data: Partial<UtilityDataType>) {
  await createUtilityData(data);
  revalidatePath(path);
}
