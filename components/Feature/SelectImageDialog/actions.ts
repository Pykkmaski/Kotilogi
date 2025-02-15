'use server';

import db from 'kotilogi-app/dbconfig';

export async function getImageIdsAction(parentId: string) {
  return await db('data_files').where({ parent_id: parentId, type: 'image/jpeg' }).pluck('id');
}
