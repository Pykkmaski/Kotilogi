'use server';

import db from 'kotilogi-app/dbconfig';

export const getContent = async (tablename: string) => await db(tablename);
