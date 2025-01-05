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

    const [authorId] = await db('object').where({ id: objectId }).pluck('authorId');
    if (session.user.id !== authorId) {
      throw new Error('Vain tiedon laatija voi muokata- tai poistaa sen!');
    }
  }

  /**Creates a new object. */
  async create<T extends ObjectDataType>(
    data: Partial<T>,
    callback: (obj: ObjectDataType, trx: Knex.Transaction) => Promise<void>,
    ctx?: Knex.Transaction
  ) {
    const trx = ctx || (await db.transaction());
    const session = await verifySession();

    const dataToInsert = filterValidColumns(data, await getTableColumns('object', trx));
    const { id, ...rest } = dataToInsert;
    const [obj] = (await trx('object').insert(
      { ...rest, authorId: session.user.id, timestamp: Date.now() },
      '*'
    )) as [ObjectDataType];

    await callback(obj, trx);

    if (typeof ctx == 'undefined') {
      //Commit the transaction here if none was provided from the outside.
      await trx.commit();
    }
  }

  /**Updates an object. */
  async update<T extends ObjectDataType>(
    objectId: string,
    data: Partial<T>,
    callback: (trx: Knex.Transaction) => Promise<void>
  ) {
    const trx = await db.transaction();
    const validColumns = await getTableColumns('object', trx);

    await trx('object')
      .where({ id: objectId })
      .update({
        ...filterValidColumns(data, validColumns),
      });

    await callback(trx);

    await trx.commit();
  }

  /**Deletes an object. Will cascade the deletion to all db entries that refer to the deleted object. */
  async del(
    id: string,
    callback?: (trx: Knex.Transaction) => Promise<void>,
    ctx?: Knex.Transaction
  ) {
    const trx = ctx || (await db.transaction());
    await trx('object').where({ id }).del();
    callback && (await callback(trx));

    if (typeof ctx == 'undefined') {
      await trx.commit();
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
    try {
      const trx = await db.transaction();
      const session = await verifySession();
      for (let i = 0; i < count; ++i) {
        const [obj] = await trx('object').insert(
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
              await trx('object')
                .where({ id: current.id })
                .update({
                  ...filterValidColumns(data, await getTableColumns('object', trx)),
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
