'use server';

import db from 'kotilogi-app/dbconfig';
import { revalidatePath } from 'next/cache';

export async function setMainImageAction(objectId: string, imageId: string) {
  console.log(objectId, imageId);
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
