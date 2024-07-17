import { Knex } from 'knex';
import { AppObject, AppObjectType } from './AppObject';
import { PropertyEvent } from './PropertyEvent';
import db from 'kotilogi-app/dbconfig';
import { createDueDate } from '../createDueDate';
import { EventType } from 'next-auth';

export type PropertyType = AppObjectType & {
  buildingType: string;
  buildingMaterial: string;
  roofType: string;
  roofMaterial: string;
  events: Map<string, PropertyEvent>;
};

export class Property extends AppObject {
  protected static propertyPrice: number = 996;

  constructor(data: PropertyType) {
    super(data);
  }

  public static async createProperty(data: Partial<PropertyType>) {
    await super.createObject(data, async (obj, trx) => {
      await trx('properties').insert({
        ...data,
        id: obj.id,
      });

      await super.create(async (d, trx) => {
        await trx('propertyOwners').insert({
          id: d.id,
          userId: obj.author,
        });
      });

      await super.create(async (d, trx) => {
        await trx('billing').insert({
          id: d.id,
          price: Property.propertyPrice,
          customer: obj.author,
        });
      });
    });
  }

  public static async loadProperty(id: number) {}
}
