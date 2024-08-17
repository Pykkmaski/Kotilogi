import db from 'kotilogi-app/dbconfig';
import { UtilityDataType } from './types';
import { createObject, updateObject } from './objectData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { UtilityType } from './enums/UtilityType';

/**Creates utility data. */
export async function createUtilityData(data: Partial<UtilityDataType>) {
  return createObject(data, async (obj, trx) => {
    await trx('data_utilities').insert({
      id: obj.id,
      time: new Date(data.time).getTime(),
      monetaryAmount: data.monetaryAmount,
      unitAmount: data.unitAmount,
      typeId: data.typeId,
    });
  });
}

export async function getUtilityData(query: TODO, year?: number, types: string[] = []) {
  const dbQuery = db('data_utilities')
    .join('data_objects', { 'data_objects.id': 'data_utilities.id' })
    .join('ref_utilityTypes', { 'ref_utilityTypes.id': 'data_utilities.typeId' })
    .select(
      'data_objects.*',
      'data_utilities.time',
      'data_utilities.monetaryAmount',
      'ref_utilityTypes.name as typeLabel'
    )
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
    .andWhere(query);

  if (types.length) {
    dbQuery.whereIn('ref_utilityTypes.name', types);
  }

  return await dbQuery;
}

export async function updateUtilityData(data: Partial<UtilityDataType>) {
  return updateObject(data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('data_utilities', trx));
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
