'use server';

import db from 'kotilogi-app/dbconfig';
import { deleteFile, uploadFiles } from 'kotilogi-app/dataAccess/files';
import { revalidatePath } from 'next/cache';

export async function AUploadFile(fd: FormData, parentId: string) {
  await uploadFiles([fd.get('file') as unknown as File], parentId);
  revalidatePath('files');
  return 0;
}

export async function ADeleteFile(id: string) {
  await deleteFile(id);
  revalidatePath('/newDashboard/properties/[id]/');
  revalidatePath('/newDashboard/properties/[id]/events/[id]');
  return 0;
}

/**
 *@deprecated
 * @param objectId
 * @param imageId
 * @returns
 */
export async function ASetMainImage(objectId: string, imageId: string) {
  const [previousMainImage] = await db('data_mainImages').where({ objectId });

  if (previousMainImage && previousMainImage.imageId == imageId) {
    return -1;
  } else if (previousMainImage) {
    await db('data_mainImages').where({ id: previousMainImage.id }).update({
      imageId,
    });
  } else {
    await db('data_mainImages').insert({
      objectId,
      imageId,
    });
  }

  revalidatePath('/newDashboard/*');
  return 0;
}

export async function setMainImageAction(objectId: string, imageId: string) {
  const [idOfPrevious] = await db('data_mainImages').where({ objectId }).pluck('id');

  if (idOfPrevious) {
    await db('data_mainImages').where({ id: idOfPrevious }).update({ imageId });
  } else {
    console.log('Setting main image...');
    await db('data_mainImages').insert({ objectId, imageId });
  }
  revalidatePath('/dashboard/');

  return {
    status: 200,
    statusText: 'Pääkuvan vaihto onnistui!',
  };
}
