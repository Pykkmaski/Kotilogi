'use server';

import db from 'kotilogi-app/dbconfig';
import { deleteFile, uploadFiles } from 'kotilogi-app/models/files';
import { revalidatePath } from 'next/cache';

export async function AUploadFile(fd: FormData, parentId: string) {
  await uploadFiles([fd], parentId);
  revalidatePath('files');
  return 0;
}

export async function ADeleteFile(id: string) {
  await deleteFile(id);
  revalidatePath('/newDashboard/properties/[id]/');
  revalidatePath('/newDashboard/properties/[id]/events/[id]');
  return 0;
}

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
