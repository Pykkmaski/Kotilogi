'use server';

import { heating } from 'kotilogi-app/features/events/DAL/heating';
import db from 'kotilogi-app/dbconfig';

export const getSelectorOptions = async (tablename: string) => {
  return await db(tablename);
};

export const removeHeatingAction = async (heating_id: string) => {
  await heating.del(heating_id, db);
};
