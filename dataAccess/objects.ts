import 'server-only';
import { Knex } from 'knex';
import { ObjectDataType } from './types';
import db from 'kotilogi-app/dbconfig';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { verifySession } from 'kotilogi-app/utils/verifySession';

class Objects {
  async verifySessionUserIsAuthor(objectId: string) {
    const session = await verifySession();

    const [authorId] = await db('objects.data').where({ id: objectId }).pluck('authorId');
    if (session.user.id !== authorId) {
      throw new Error('Vain tiedon laatija voi muokata- tai poistaa sen!');
    }
  }

  /**Creates a new object. */
  async create<T extends ObjectDataType>(
    data: Partial<T>,
    callback: (obj: ObjectDataType, trx: Knex.Transaction) => Promise<void>
  ) {
    const trx = await db.transaction();
    try {
      const session = await verifySession();
      const dataToInsert = filterValidColumns(data, await getTableColumns('data', trx, 'objects'));
      const [obj] = (await trx('objects.data').insert(
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

  /**Updates an object. */
  async update<T extends ObjectDataType>(
    objectId: string,
    data: Partial<T>,
    callback: (trx: Knex.Transaction) => Promise<void>
  ) {
    const trx = await db.transaction();
    try {
      const validColumns = await getTableColumns('data', trx, 'objects');
      await trx('objects.data')
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

  /**Deletes an object. Will cascade the deletion to all db entries that refer to the deleted object. */
  async del(id: string, callback?: (trx: Knex.Transaction) => Promise<void>) {
    const trx = await db.transaction();
    try {
      await trx('objects.data').where({ id }).del();
      callback && (await callback(trx));
      await trx.commit();
    } catch (err) {
      console.log(err.message);
      await trx.rollback();
      throw err;
    }
  }

  /**Creates multiple objects at once.
   * @param count The number of objects to create.
   * @param parentId The id of the parent object.
   * @param callback The async operation to perform in relation to each created object.
   * @param onError Callback in case of an error.
   */
  async batchCreate(
    /**The number of objects to create. */
    count: number,

    /**The parentId of the objects. */
    parentId: string | null,

    /**The operation to perform in relation to each created object. */
    callback: (objId: string, currentIndex: number, trx: Knex.Transaction) => Promise<void>,

    onError?: (err: any) => Promise<void>
  ) {
    const trx = await db.transaction();
    try {
      const session = await verifySession();
      for (let i = 0; i < count; ++i) {
        const [obj] = await trx('objects.data').insert(
          {
            parentId,
            timestamp: Date.now(),
            authorId: session.user.id,
          },
          '*'
        );

        await callback(obj.id, i, trx);
      }

      await trx.commit();
    } catch (err) {
      console.error(err.message);
      await trx.rollback();
      await onError(err);
      throw err;
    }
  }

  async batchUpdate<T extends ObjectDataType>(
    data: T[],
    callback: (index: number, trx: Knex.Transaction) => Promise<void>
  ) {
    const trx = await db.transaction();
    try {
      const promises: Promise<void>[] = [];
      for (let i = 0; i < data.length; ++i) {
        promises.push(
          new Promise<void>(async (resolve, reject) => {
            try {
              const current = data[i];
              await trx('objects.data')
                .where({ id: current.id })
                .update({
                  ...filterValidColumns(data, await getTableColumns('objects.data', trx)),
                });

              await callback(i, trx);
              resolve();
            } catch (err) {
              reject(err);
            }
          })
        );
      }

      await Promise.all(promises);
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
}

export const objects = new Objects();
