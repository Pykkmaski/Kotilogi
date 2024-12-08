'use server';

import db from 'kotilogi-app/dbconfig';

/**Should be moved next to the OptionSelector-component. */
export const getContent = async (tablename: string, query: any) => await db(tablename).where(query);
