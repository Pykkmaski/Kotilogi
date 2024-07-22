import db from 'kotilogi-app/dbconfig';
import { UtilityDataType } from './types';
import { createObject, updateObject } from './objectData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { UtilityType } from './enums/UtilityType';

/**Creates utility data. */
export async function createUtilityData(data: Partial<UtilityDataType>) {
  return createObject(data, async (obj, trx) => {
    await trx('utilityData').insert({
      id: obj.id,
      time: data.time,
      monetaryAmount: data.monetaryAmount * 100,
      unitAmount: data.unitAmount * 100,
      type: data.type,
    });
  });
}

export async function getUtilityData(query: TODO, year?: number) {
  return db('utilityData')
    .join('objectData', { 'objectData.id': 'utilityData.id' })
    .where(function () {
      if (!year) return;

      //The timestamps are stored as integers. Filter by values that fall within the same year.
      const time = new Date(0);
      time.setFullYear(year);

      const endTime = new Date(time);
      endTime.setFullYear(endTime.getFullYear() + 1);

      this.where('time', '>=', time.getTime()).andWhere('time', '<', endTime.getTime());
    })
    .andWhere(query);
}

export async function updateUtilityData(data: Partial<UtilityDataType>) {
  return updateObject(data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('utilityData', trx));
    await trx('utilityData').where({ id: data.id }).update(updateObject);
  });
}
