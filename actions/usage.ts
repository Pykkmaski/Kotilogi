'use server';

import { revalidatePath } from 'next/cache';
import db from 'kotilogi-app/dbconfig';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';

const TABLENAME = 'usage';
const PATH = '/properties/[property_id]/usage';

const revalidateUsage = () => revalidatePath(PATH, 'page');
const usageTable = new DatabaseTable(TABLENAME);

export async function getByDateRange(
  startDate: number,
  endDate: number,
  query: Partial<Kotidok.UsageType>
) {
  const data = await usageTable.get(query);
  return data.filter(d => {
    const time = parseInt(d.time);
    return time >= startDate && time <= endDate;
  });
}

export async function getByYear(year: number, query: Partial<Kotidok.UsageType>) {
  const data = await usageTable.get(query);

  return data.filter(d => {
    const dataYear = new Date(d.time).getFullYear();
    if (dataYear === year) {
      return d;
    }
  });
}

type UsageValidationResult = 'valid' | 'invalid_date';

function validateUsageData(data: Kotidok.UsageType) {
  const currentTime = Date.now();
  const dataTime = new Date(data.time).getTime();
  if (Number.isNaN(dataTime))
    throw new Error(
      'Error validating usage data! Passed data time parses to NaN ' + `(${data.time})`
    );
  if (dataTime > currentTime) {
    return 'invalid_date';
  } else {
    return 'valid';
  }
}

export async function get(query: Partial<Kotidok.UsageType>, year: string = 'all') {
  if (year === 'all') {
    //Return all data.
    return db(TABLENAME).where(query) as unknown as Kotidok.UsageType[];
  } else {
    return db(TABLENAME)
      .where(query)
      .whereLike('time', `%${year}%`) as unknown as Kotidok.UsageType[];
  }
}

export async function add(usageData: Kotidok.UsageType) {
  const validationResult = 'valid'; //validateUsageData(usageData)
  if (validationResult !== 'valid') throw new Error(validationResult);

  return await usageTable.add(usageData).then(() => revalidateUsage());
}

export async function del(usageData: Kotidok.UsageType) {
  //The time beyond which the data cannot be deleted:
  const expiryTime = parseInt(usageData.time + 1000 * 60 * 60 * 24 * 7);
  if (parseInt(usageData.time) > expiryTime) {
    throw new Error('deletion_prohibited');
  }

  return await usageTable.del({ id: usageData.id }).then(() => revalidateUsage());
}

export async function update(id: Kotidok.IdType, usageData: Kotidok.UsageType) {
  return await usageTable.update(usageData, { id: usageData.id }).then(() => revalidateUsage());
}
