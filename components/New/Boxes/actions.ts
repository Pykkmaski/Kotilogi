'use server';

import db from 'kotilogi-app/dbconfig';

export async function getImageIdsAction(parentId: string) {
  return await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId, type: 'image/jpeg' })
    .pluck('data_files.id');
}
