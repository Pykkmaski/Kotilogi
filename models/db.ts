'use server';

import { Knex } from 'knex';
import db from '../dbconfig';
import {
  AppartmentType,
  AppObjectType,
  HistoryType,
  HouseType,
  PropertyType,
  UtilityType,
} from './types';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { createObject } from './objectData';

/**
 * Returns the files belonging to an object.
 * @param targetId
 */
export async function getFileData(objectId: string) {
  return db('fileData')
    .join('objectData', 'objectData.id', '=', 'fileData.id')
    .where({ parentId: objectId });
}

/**
 * Returns the history entries for an object.
 * @param objectId
 * @returns
 */
export async function getObjectHistory(objectId: string) {
  return db('historyData').where({ refId: objectId });
}

/**Creates utility data. */
export async function createUtilityData(data: Partial<UtilityType>) {
  return createObject(data, async (obj, trx) => {
    await trx('utilityData').insert({
      id: obj.id,
      time: data.time,
      monetaryAmount: data.monetaryAmount,
      unitAmount: data.unitAmount,
      type: data.type,
    });
  });
}

/**Updates utility data. */
export async function updateUtilityData(data: Partial<UtilityType>) {
  if (!data.id) throw new Error('The id of the utility-item must be defined, to update it!');
  const trx = await db.transaction();
  const { id, title, description } = data;
  await trx('objectData').where({ id }).update({
    title,
    description,
  });
}

/**Creates a history record. */
export async function createHistoryData(data: Omit<HistoryType, 'id'>) {
  await db('historyData').insert(data);
}

/** Adds a owner for a property. */
export async function addPropertyOwner(propertyId: string, userId: string) {
  await db('propertyOwnerData').insert({
    propertyId,
    userId,
    timeStamp: Date.now(),
  });
}

/**Removes an owner of a property. */
export async function deletePropertyOwner(propertyId: string, userId: string) {
  await db('propertyOwnerData').where({ propertyId, userId }).del();
}
