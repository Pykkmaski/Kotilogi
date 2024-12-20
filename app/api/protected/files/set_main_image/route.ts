import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import db from 'kotilogi-app/dbconfig';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import z from 'zod';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    z.object({
      objectId: z.string(),
      imageId: z.string(),
    }).parse(data);

    const { objectId, imageId } = data;

    const [idOfPrevious] = await db('data_mainImages').where({ objectId }).pluck('id');

    if (idOfPrevious) {
      await db('data_mainImages').where({ id: idOfPrevious }).update({ imageId });
    } else {
      console.log('Setting main image...');
      await db('data_mainImages').insert({ objectId, imageId });
    }
    revalidatePath('/dashboard/');
    return response('success', null, 'Pääkuvan vaihto onnistui!'.normalize('NFC'));
  } catch (err) {
    return handleServerError(req, err);
  }
}
