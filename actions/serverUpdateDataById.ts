'use server';

import db from 'kotilogi-app/dbconfig';

async function setMainImage(imageId: Kotidok.IdType, refId: Kotidok.IdType, dbTableName: 'properties' | 'propertyEvents'): Promise<void> {
  /**
   * Sets the main image id of a target, either a property or an event.
   * @param {Kotidok.IdType} imageId The id of the image
   * @param {Kotidok.IdType} refId The id of either the property or the event.
   * @param {string} dbTableName The name of the database table to update, either properties or propertyEvents.
   */

  await db(dbTableName).where({ id: refId }).update({
    mainImageId: imageId,
  });
}

/**
 * Updates the data with id in given database tablename and returns the updated data.
 *
 * */

export default async function serverUpdateDataById(newData: object, id: Kotidok.IdType, dbTableName: string) {
  return db(dbTableName).where({ id }).update(newData, '*');
}
