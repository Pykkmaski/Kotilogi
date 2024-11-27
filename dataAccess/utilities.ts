import db from 'kotilogi-app/dbconfig';
import { UtilityDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { objects } from './objects';

class Utilities {
  private getDTO(data: UtilityDataType) {
    return {
      ...data,
      monetaryAmount: data.monetaryAmount / 100,
      unitAmount: data.unitAmount / 100,
    };
  }

  /**Creates utility data. */
  async create(data: Partial<UtilityDataType> & Required<Pick<UtilityDataType, 'parentId'>>) {
    return objects.create(data, async (obj, trx) => {
      await trx('data_utilities').insert({
        id: obj.id,
        date: data.date,
        monetaryAmount: Math.round(data.monetaryAmount * 100),
        unitAmount: Math.round(data.unitAmount * 100),
        typeId: data.typeId,
      });
    });
  }

  /**Fetches utility data. */
  async get(propertyId: string, year?: number, types: string[] = []) {
    const dbQuery = db('data_utilities')
      .join('objects.data', { 'objects.data.id': 'data_utilities.id' })
      .join('ref_utilityTypes', { 'ref_utilityTypes.id': 'data_utilities.typeId' })
      .select('objects.data.*', 'data_utilities.*', 'ref_utilityTypes.name as typeLabel')
      .where(function () {
        if (!year) return;

        const time = new Date(0);
        time.setFullYear(year);

        //The first day of the next year.
        const endTime = new Date(time);
        endTime.setFullYear(time.getFullYear() + 1);

        this.where('date', '>=', time).andWhere('date', '<', endTime);
      })
      .andWhere({ 'objects.data.parentId': propertyId });

    if (types.length) {
      dbQuery.whereIn('ref_utilityTypes.name', types);
    }

    const data = await dbQuery;
    const returnResult = data.map(d => this.getDTO(d));
    console.log('Return result at utilities.get: ', returnResult);
    return returnResult;
  }

  async update(id: string, data: Partial<UtilityDataType>) {
    //Only allow the author of a utility entry to edit it.
    await objects.verifySessionUserIsAuthor(data.id);

    return objects.update(id, data, async trx => {
      const updateObject = filterValidColumns(data, await getTableColumns('data_utilities', trx));
      updateObject.monetaryAmount *= 100;
      updateObject.unitAmount *= 100;
      await trx('data_utilities').where({ id: data.id }).update(updateObject);
    });
  }

  async getYears(propertyId: string) {
    const dates = (await db('data_utilities')
      .join('objects.data', { 'objects.data.id': 'data_utilities.id' })
      .where({ parentId: propertyId })
      .pluck('date')) as Date[];

    const yearSet = new Set<number>();
    for (const date of dates) {
      const year = date.getFullYear();
      yearSet.add(year);
    }

    return Array.from(yearSet);
  }

  async del(id: string) {
    await objects.verifySessionUserIsAuthor(id);
    await objects.del(id);
  }
}

export const utilities = new Utilities();
