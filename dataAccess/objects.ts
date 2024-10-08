import 'server-only';
import { Knex } from 'knex';
import { ObjectDataType } from './types';
import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { verifySessionUserIsAuthor } from './utils/verifySessionUserIsAuthor';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export async function createObject<T extends ObjectDataType>(
  data: Partial<T>,
  callback: (obj: ObjectDataType, trx: Knex.Transaction) => Promise<void>
) {
  const trx = await db.transaction();
  try {
    const session = await verifySession();
    const dataToInsert = filterValidColumns(data, await getTableColumns('data_objects', trx));
    const [obj] = (await trx('data_objects').insert(
      { ...dataToInsert, authorId: session.user.id, timestamp: Date.now() },
      '*'
    )) as [ObjectDataType];

    await callback(obj, trx);
    await trx.commit();
  } catch (err: any) {
    await trx.rollback();
    throw err;
  }
}

export async function updateObject<T extends ObjectDataType>(
  objectId: string,
  data: Partial<T>,
  callback: (trx: Knex.Transaction) => Promise<void>
) {
  const trx = await db.transaction();
  try {
    const validColumns = await getTableColumns('data_objects', trx);
    await trx('data_objects')
      .where({ id: objectId })
      .update({
        ...filterValidColumns(data, validColumns),
      });
    await callback(trx);
    await trx.commit();
  } catch (err: any) {
    await trx.rollback();
    throw err;
  }
}

export async function deleteObject(
  id: string,
  callback?: (trx: Knex.Transaction) => Promise<void>
) {
  const trx = await db.transaction();
  try {
    await trx('data_objects').where({ id }).del();
    callback && (await callback(trx));
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
    throw err;
  }
}
