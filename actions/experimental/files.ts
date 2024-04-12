'use server';

import db from 'kotilogi-app/dbconfig';
import { Files } from 'kotilogi-app/utils/files';
import { revalidatePath } from 'next/cache';

const getPath = (tablename: string) => (tablename === 'propertyFiles' ? '/properties/[property_id]/' : '/events/[event_id]/');

/**
 * Uploads a single file and adds its data into the database.
 * Can be used to upload a single file on its own, or as alongside adding of data that has files. In the latter case, provide a transaction object.
 * @param tablename
 * @param file
 * @param trx
 */

export async function addFiles(tablename: 'propertyFiles' | 'eventFiles', fileData: FormData[], refId: string) {
  const trx = await db.transaction();
  const files = new Files(tablename, trx);

  try {
    const promises = fileData.map(fdata => {
      files.addFile(fdata.get('file') as unknown as File, refId);
    });
    await Promise.all(promises);
    await trx.commit();
    revalidatePath(getPath(tablename));
  } catch (err) {
    await files.rollbackFiles();
    await trx.rollback();
    throw err;
  }
}

export async function deleteFile(tablename: 'propertyFiles' | 'eventFiles', id: string) {
  const files = new Files(tablename);

  try {
    await files.deleteFile(id);
    revalidatePath(getPath(tablename));
  } catch (err) {
    await files.rollbackFiles();
    throw err;
  }
}
