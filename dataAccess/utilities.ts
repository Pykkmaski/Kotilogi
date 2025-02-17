import db from 'kotilogi-app/dbconfig';
import { UtilityDataType } from './types';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { objects } from './objects';
import { utilitySchema } from 'kotilogi-app/utils/models/utilitySchema';

class Utilities {
  private getDTO(data: UtilityDataType) {
    return {
      ...data,
      monetaryAmount: data.monetaryAmount / 100,
      unitAmount: data.unitAmount / 100,
    };
  }

  /**Creates utility data. */
  async create(data: Partial<UtilityDataType> & Required<Pick<UtilityDataType, 'property_id'>>) {
    return objects.create(async (obj, trx) => {
      data.id = obj.id;
      const payload = utilitySchema.parse(data);
      await trx('data_utilities').insert(payload);
    });
  }

  /**Fetches utility data. */
  async get(propertyId: string, year?: number, types: string[] = []) {
    const dbQuery = db('data_utilities')
      .join('object', { 'object.id': 'data_utilities.id' })
      .join('ref_utilityTypes', { 'ref_utilityTypes.id': 'data_utilities.typeId' })
      .select('object.*', 'data_utilities.*', 'ref_utilityTypes.name as typeLabel')
      .where(function () {
        if (!year) return;

        const time = new Date(0);
        time.setFullYear(year);

        //The first day of the next year.
        const endTime = new Date(time);
        endTime.setFullYear(time.getFullYear() + 1);

        this.where('date', '>=', time).andWhere('date', '<', endTime);
      })
      .andWhere({ 'data_utilities.property_id': propertyId });

    if (types.length) {
      dbQuery.whereIn('ref_utilityTypes.name', types);
    }

    const data = await dbQuery;
    const returnResult = data.map(d => this.getDTO(d));

    return returnResult;
  }

  async update(id: string, data: Partial<UtilityDataType>) {
    //Only allow the author of a utility entry to edit it.
    await objects.verifySessionUserIsAuthor(data.id, db);

    return objects.update(id, data, async trx => {
      const updateObject = filterValidColumns(data, await getTableColumns('data_utilities', trx));
      updateObject.monetaryAmount *= 100;
      updateObject.unitAmount *= 100;
      await trx('data_utilities').where({ id: data.id }).update(updateObject);
    });
  }

  async getYears(propertyId: string) {
    const dates = (await db('data_utilities')
      .join('object', { 'object.id': 'data_utilities.id' })
      .where({ property_id: propertyId })
      .pluck('date')) as Date[];

    const yearSet = new Set<number>();
    for (const date of dates) {
      const year = date.getFullYear();
      yearSet.add(year);
    }

    return Array.from(yearSet);
  }

  async del(id: string) {
    await objects.del(id);
  }
}

export const utilities = new Utilities();
