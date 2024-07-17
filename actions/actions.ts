'use server';

import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { ServerResult } from 'kotilogi-app/types/ServerResult';
import { createDueDate } from 'kotilogi-app/utils/createDueDate';

export async function addData<
  TablenameT extends string,
  ArgsT extends TablenameT extends 'properties' ? [string] : [],
  DataT extends TablenameT extends 'properties'
    ? Kotidok.PropertyType
    : TablenameT extends 'propertyEvents'
    ? Kotidok.EventType
    : Kotidok.ItemType
>(tablename: string, data: DataT, ...args: ArgsT): Promise<number> {
  const trx = await db.transaction();
  try {
    const [dataId] = await trx(tablename).insert(data, 'id');

    const createBill = async (price: number, dueInDays: number, customer: string) => {
      await trx('bills').insert({
        price,
        due: createDueDate(dueInDays),
        refId: dataId,
        customer,
      });
    };

    switch (tablename) {
      case 'properties':
        {
          await createBill(990, 30, data.refId);
        }
        break;
    }

    await trx.commit();
    return 0;
  } catch (err: unknown) {
    await trx.rollback();

    if (typeof err == 'number') {
      return err;
    } else {
      if (typeof err == 'object' && 'message' in err) {
        console.log(err.message);
      }

      return ServerResult.UNEXPECTED;
    }
  }
}

export async function updateData<
  TablenameT extends string,
  DataT extends TablenameT extends 'properties'
    ? Kotidok.PropertyType
    : TablenameT extends 'propertyEvents'
    ? Kotidok.EventType
    : Kotidok.ItemType,
  ArgsT extends TablenameT extends 'propertyEvents' ? [string] : []
>(tablename: TablenameT, data: Partial<DataT>, ...args: ArgsT): Promise<number> {
  const trx = await db.transaction();

  try {
    switch (tablename) {
      case 'propertyEvents': {
        //Only allow updating of events if done by the author of the event.
        const updatedBy = args[0];
        const [{ createdBy: author }] = await trx(tablename)
          .where({ id: data.id })
          .select('createdBy');
        if (updatedBy !== author) throw ServerResult.INVALID_USER;
      }
    }

    await trx(tablename).update(data);
    await trx.commit();
    return 0;
  } catch (err: unknown) {
    await trx.rollback();
    if (typeof err == 'number') {
      return err;
    } else {
      if (typeof err == 'object' && 'message' in err) {
        console.log(err.message);
      }

      return ServerResult.UNEXPECTED;
    }
  }
}

export async function deleteData<
  TablenameT extends string,
  ArgsT extends TablenameT extends 'properties' ? [string, string] : []
>(tablename: TablenameT, id: number, ...args: ArgsT): Promise<number> {
  const trx = await db.transaction();
  try {
    switch (tablename) {
      case 'properties':
        {
          const password = args[0];
          const email = args[1];

          const [{ password: encrypted }] = await trx('users').where({ email }).select('password');

          const ok = await bcrypt.compare(password, encrypted);
          if (!ok) throw ServerResult.INVALID_PASSWORD;
        }
        break;

      case 'propertyEvents':
        {
          const deletingUser = args[0];
          const [{ createdBy: author }] = await trx(tablename).where({ id }).select('createdBy');
          if (deletingUser !== author) throw ServerResult.INVALID_USER;
        }
        break;
    }

    await trx(tablename).where({ id }).del();
    trx.commit();
    return 0;
  } catch (err: unknown) {
    await trx.rollback();

    if (typeof err == 'number') {
      return err;
    } else {
      if (typeof err == 'object' && 'message' in err) {
        console.log(err.message);
      }

      return ServerResult.UNEXPECTED;
    }
  }
}
