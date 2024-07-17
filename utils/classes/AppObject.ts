import { Knex } from 'knex';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import { AppData, AppDataType } from './AppData';

export type AppObjectType = AppDataType & {
  parentId: number | null;
  author: string;
};

export abstract class AppObject extends AppData {
  public static async createObject(
    data: Partial<AppObjectType>,
    callback: (obj: AppObjectType, trx: Knex.Transaction) => Promise<void>,
    trx?: Knex.Transaction
  ) {
    await super.create(async (d, trx) => {
      const session = (await getServerSession(options as any)) as any;
      const [obj] = await trx('objects').insert(
        {
          id: d.id,
          parentId: data.parentId,
          author: session.user.email,
        },
        '*'
      );

      await callback(obj, trx);
    }, trx);
  }

  public static async load(id: number, callback: (obj: AppObjectType) => Promise<AppObject>) {
    const [obj] = await db('objects').where({ id });
    return await callback(obj);
  }
}
