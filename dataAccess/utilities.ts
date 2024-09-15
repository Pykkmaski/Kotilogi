import db from 'kotilogi-app/dbconfig';
import { UtilityDataType } from './types';
import { createObject, deleteObject, updateObject } from './objects';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { verifySessionUserIsAuthor } from './utils/verifySessionUserIsAuthor';

function getUtilityDTO(data: UtilityDataType) {
  return {
    ...data,
    monetaryAmount: data.monetaryAmount / 100,
    unitAmount: data.unitAmount / 100,
  };
}

/**Creates utility data. */
export async function createUtilityData(
  data: Partial<UtilityDataType> & Required<Pick<UtilityDataType, 'parentId'>>
) {
  return createObject(data, async (obj, trx) => {
    await trx('data_utilities').insert({
      id: obj.id,
      time: new Date(data.time).getTime(),
      monetaryAmount: data.monetaryAmount * 100,
      unitAmount: data.unitAmount * 100,
      typeId: data.typeId,
    });
  });
}

export async function getUtilityData(propertyId: string, year?: number, types: string[] = []) {
  const dbQuery = db('data_utilities')
    .join('data_objects', { 'data_objects.id': 'data_utilities.id' })
    .join('ref_utilityTypes', { 'ref_utilityTypes.id': 'data_utilities.typeId' })
    .select('data_objects.*', 'data_utilities.*', 'ref_utilityTypes.name as typeLabel')
    .where(function () {
      if (!year) return;

      //The timestamps are stored as integers. Filter by values that fall within the same year.
      const time = new Date(0);
      time.setFullYear(year);

      //The first day of the next year.
      const endTime = new Date(time);
      endTime.setFullYear(time.getFullYear() + 1);

      this.where('time', '>=', time.getTime()).andWhere('time', '<', endTime.getTime());
    })
    .andWhere({ 'data_objects.parentId': propertyId });

  if (types.length) {
    dbQuery.whereIn('ref_utilityTypes.name', types);
  }

  const data = await dbQuery;
  return data.map(d => getUtilityDTO(d));
}

export async function updateUtilityData(id: string, data: Partial<UtilityDataType>) {
  //Only allow the author of a utility entry to edit it.
  await verifySessionUserIsAuthor(data.id);

  return updateObject(id, data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('data_utilities', trx));
    updateObject.monetaryAmount *= 100;
    updateObject.unitAmount *= 100;
    await trx('data_utilities').where({ id: data.id }).update(updateObject);
  });
}

export async function getUtilityYears(propertyId: string) {
  const timestamps = (await db('data_utilities')
    .join('data_objects', { 'data_objects.id': 'data_utilities.id' })
    .where({ parentId: propertyId })
    .pluck('time')) as string[];

  const yearSet = new Set<number>();
  for (const timestamp of timestamps) {
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    yearSet.add(year);
  }

  return Array.from(yearSet);
}

export async function deleteUtilityData(id: string) {
  await verifySessionUserIsAuthor(id);
  await deleteObject(id);
}
