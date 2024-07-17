import db from 'kotilogi-app/dbconfig';
import { UtilityDataType } from './types';
import { updateObject } from './objectData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

export async function getUtilityData(propertyId: string) {
  return db('utilityData')
    .join('objectData', 'objectData.id', '=', 'utilityData.id')
    .where({ parentId: propertyId });
}

export async function updateUtilityData(data: Partial<UtilityDataType>) {
  return updateObject(data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('utilityData', trx));
    await trx('utilityData').where({ id: data.id }).update(updateObject);
  });
}
