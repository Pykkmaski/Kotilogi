import { Knex } from 'knex';
import { AppObject, AppObjectType } from './AppObject';
import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';

export type EventType = AppObjectType & {
  title: string;
  description: string;
  date: number;
};

export class PropertyEvent extends AppObject {
  constructor(data: EventType) {
    super(data);
  }

  public static async loadEvent(id: number) {
    return await super.load(id, async obj => {
      const [eventData] = await db('propertyEvents').where({ id: obj.id });
      return new PropertyEvent({
        ...eventData,
        ...obj,
      });
    });
  }
}
